#define _GNU_SOURCE
#define FUSE_USE_VERSION 31
#define _FILE_OFFSET_BITS 64
#include <fuse3/fuse.h>
#include <linux/openat2.h>
#include <linux/vm_sockets.h>
#include <dirent.h>
#include <sys/socket.h>
#include <sys/stat.h>
#include <sys/syscall.h>
#include <sys/un.h>
#include <errno.h>
#include <fcntl.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <time.h>

#define MAX_REPLY 30000

struct file_body { int fd; char *data; size_t len; };
static int root_fd = -1;

static int real_open(const char *path, int flags) {
    struct open_how how = { .flags = (uint64_t)flags,
                            .resolve = RESOLVE_BENEATH | RESOLVE_NO_SYMLINKS | RESOLVE_NO_XDEV };
    return syscall(SYS_openat2, root_fd, path[1] ? path + 1 : ".", &how, sizeof(how));
}

static int recv_exact(int fd, char *dst, size_t count) {
    size_t got = 0;
    while (got < count) {
        ssize_t n = recv(fd, dst + got, count - got, 0);
        if (n <= 0) return -EIO;
        got += (size_t)n;
    }
    return 0;
}

static int broker(const char *verb, const char *path, char **body, size_t *len) {
    if (strpbrk(path, "\r\n")) return -ENOENT;
    const char *socket_path = getenv("COREDEF_BROKER_SOCKET");
    struct sockaddr_un local = { .sun_family = AF_UNIX };
    if (socket_path && strlen(socket_path) >= sizeof(local.sun_path)) return -ENAMETOOLONG;
    int fd = socket(socket_path ? AF_UNIX : AF_VSOCK, SOCK_STREAM | SOCK_CLOEXEC, 0);
    if (fd < 0) return -EIO;
    struct timeval timeout = { .tv_sec = 18, .tv_usec = 0 };
    setsockopt(fd, SOL_SOCKET, SO_RCVTIMEO, &timeout, sizeof(timeout));
    setsockopt(fd, SOL_SOCKET, SO_SNDTIMEO, &timeout, sizeof(timeout));
    struct sockaddr_vm addr = { .svm_family = AF_VSOCK, .svm_cid = VMADDR_CID_HOST, .svm_port = 6000 };
    int rc;
    if (socket_path) {
        strcpy(local.sun_path, socket_path);
        rc = connect(fd, (struct sockaddr *)&local, sizeof(local));
    } else {
        rc = connect(fd, (struct sockaddr *)&addr, sizeof(addr));
    }
    if (rc < 0) { close(fd); return -EIO; }
    char request[320];
    int n = snprintf(request, sizeof(request), "%s %s\n", verb, path);
    if (n < 0 || n >= (int)sizeof(request) || send(fd, request, (size_t)n, 0) != n) { close(fd); return -EIO; }
    char header[64] = {0};
    size_t used = 0;
    while (used < sizeof(header) - 1) {
        if (recv_exact(fd, header + used, 1) != 0) { close(fd); return -EIO; }
        if (header[used++] == '\n') break;
    }
    if (strncmp(header, "ERR 2", 5) == 0) { close(fd); return -ENOENT; }
    if (strncmp(header, "OK ", 3) != 0) { close(fd); return -EIO; }
    long count = strtol(header + 3, NULL, 10);
    if (count < 0 || count > MAX_REPLY) { close(fd); return -EIO; }
    char *result = calloc((size_t)count + 1, 1);
    if (!result) { close(fd); return -ENOMEM; }
    rc = recv_exact(fd, result, (size_t)count);
    close(fd);
    if (rc != 0) { free(result); return rc; }
    *body = result;
    *len = (size_t)count;
    return 0;
}

static int vault_getattr(const char *path, struct stat *st, struct fuse_file_info *fi) {
    if (fi && fi->fh) {
        struct file_body *file = (struct file_body *)(uintptr_t)fi->fh;
        if (file->fd >= 0) return fstat(file->fd, st) == 0 ? 0 : -errno;
        memset(st, 0, sizeof(*st));
        st->st_mode = S_IFREG | 0644;
        st->st_nlink = 1;
        st->st_size = (off_t)file->len;
        st->st_mtime = st->st_ctime = st->st_atime = time(NULL);
        return 0;
    }
    int fd = real_open(path, O_PATH | O_NOFOLLOW);
    if (fd >= 0) {
        int rc = fstat(fd, st) == 0 ? 0 : -errno;
        close(fd);
        if (rc != 0) return rc;
        if (S_ISLNK(st->st_mode)) return -ELOOP;
        return S_ISDIR(st->st_mode) || S_ISREG(st->st_mode) ? 0 : -EACCES;
    }
    if (errno != ENOENT) return -errno;
    memset(st, 0, sizeof(*st));
    st->st_mtime = st->st_ctime = st->st_atime = time(NULL);
    if (strcmp(path, "/") == 0) {
        st->st_mode = S_IFDIR | 0755;
        st->st_nlink = 2;
        return 0;
    }
    char *kind = NULL;
    size_t len = 0;
    int rc = broker("STAT", path, &kind, &len);
    if (rc != 0) return rc;
    if (strcmp(kind, "dir") == 0) {
        st->st_mode = S_IFDIR | 0755;
        st->st_nlink = 2;
    } else if (strncmp(kind, "file ", 5) == 0) {
        st->st_mode = S_IFREG | 0644;
        st->st_nlink = 1;
        st->st_size = strtol(kind + 5, NULL, 10);
    } else {
        rc = -ENOENT;
    }
    free(kind);
    return rc;
}

static int vault_readdir(const char *path, void *buf, fuse_fill_dir_t filler, off_t off,
                         struct fuse_file_info *fi, enum fuse_readdir_flags flags) {
    (void)off; (void)fi; (void)flags;
    int real_fd = real_open(path, O_RDONLY | O_DIRECTORY | O_NOFOLLOW);
    if (real_fd < 0 && errno != ENOENT) return -errno;
    DIR *dir = NULL;
    if (real_fd >= 0) {
        dir = fdopendir(real_fd);
        if (!dir) { int rc = -errno; close(real_fd); return rc; }
    }
    char *list = NULL;
    size_t len = 0;
    int rc = broker(dir ? "LIST_REAL" : "LIST", path, &list, &len);
    if (rc != 0 && !dir) return rc;
    filler(buf, ".", NULL, 0, 0);
    filler(buf, "..", NULL, 0, 0);
    if (dir) {
        struct dirent *entry;
        while ((entry = readdir(dir))) {
            if (!strcmp(entry->d_name, ".") || !strcmp(entry->d_name, "..")) continue;
            struct stat st;
            if (fstatat(real_fd, entry->d_name, &st, AT_SYMLINK_NOFOLLOW) != 0) continue;
            if ((S_ISREG(st.st_mode) || S_ISDIR(st.st_mode)) &&
                filler(buf, entry->d_name, NULL, 0, 0) != 0) break;
        }
    }
    char *save = NULL;
    for (char *line = list ? strtok_r(list, "\n", &save) : NULL; line; line = strtok_r(NULL, "\n", &save)) {
        char *tab = strchr(line, '\t');
        if (!tab) continue;
        *tab = '\0';
        struct stat st;
        if (dir && fstatat(real_fd, line, &st, AT_SYMLINK_NOFOLLOW) == 0) continue;
        if (filler(buf, line, NULL, 0, 0) != 0) break;
    }
    if (dir) closedir(dir);
    free(list);
    return 0;
}

static int vault_open(const char *path, struct fuse_file_info *fi) {
    if ((fi->flags & O_ACCMODE) != O_RDONLY) return -EROFS;
    struct file_body *file = calloc(1, sizeof(*file));
    if (!file) return -ENOMEM;
    file->fd = real_open(path, O_RDONLY | O_NONBLOCK | O_NOFOLLOW);
    if (file->fd >= 0) {
        struct stat st;
        int rc = fstat(file->fd, &st);
        if (rc != 0 || !S_ISREG(st.st_mode)) {
            rc = rc != 0 ? -errno : -EACCES;
            close(file->fd);
            free(file);
            return rc;
        }
        fi->fh = (uint64_t)(uintptr_t)file;
        fi->direct_io = 1;
        return 0;
    }
    if (errno != ENOENT) { int rc = -errno; free(file); return rc; }
    file->fd = -1;
    int rc = broker("READ", path, &file->data, &file->len);
    if (rc != 0) { free(file); return rc; }
    fi->fh = (uint64_t)(uintptr_t)file;
    fi->direct_io = 1;
    return 0;
}

static int vault_read(const char *path, char *buf, size_t size, off_t off, struct fuse_file_info *fi) {
    (void)path;
    struct file_body *file = (struct file_body *)(uintptr_t)fi->fh;
    if (file->fd >= 0) {
        ssize_t n = pread(file->fd, buf, size, off);
        return n < 0 ? -errno : (int)n;
    }
    if (off < 0 || (size_t)off >= file->len) return 0;
    if (size > file->len - (size_t)off) size = file->len - (size_t)off;
    memcpy(buf, file->data + off, size);
    return (int)size;
}

static int vault_release(const char *path, struct fuse_file_info *fi) {
    (void)path;
    struct file_body *file = (struct file_body *)(uintptr_t)fi->fh;
    if (file) { if (file->fd >= 0) close(file->fd); free(file->data); free(file); }
    return 0;
}

static const struct fuse_operations vault_ops = {
    .getattr = vault_getattr,
    .readdir = vault_readdir,
    .open = vault_open,
    .read = vault_read,
    .release = vault_release,
};

int main(int argc, char **argv) {
    if (argc < 2) return 1;
    root_fd = open(argv[argc - 1], O_RDONLY | O_DIRECTORY);
    if (root_fd < 0) { perror("open underlay"); return 1; }
    return fuse_main(argc, argv, &vault_ops, NULL);
}
