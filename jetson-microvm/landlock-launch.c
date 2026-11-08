#define _GNU_SOURCE
#include <linux/landlock.h>
#include <sys/prctl.h>
#include <sys/syscall.h>
#include <fcntl.h>
#include <errno.h>
#include <netinet/in.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>

static int add_path(int ruleset, const char *path, __u64 rights) {
    int fd = open(path, O_PATH | O_CLOEXEC);
    if (fd < 0) { perror(path); return -1; }
    struct landlock_path_beneath_attr rule = {
        .allowed_access = rights,
        .parent_fd = fd,
    };
    int result = syscall(__NR_landlock_add_rule, ruleset, LANDLOCK_RULE_PATH_BENEATH, &rule, 0);
    if (result < 0) perror("landlock_add_rule");
    close(fd);
    return result;
}

int main(int argc, char **argv) {
    if (argc < 2 || argc > 3) { fprintf(stderr, "usage: landlock-launch BASE [--selftest]\n"); return 2; }
    const char *base = argv[1];
    if (strcmp(base, "/home/covdef/coredef-microvm") != 0) {
        fprintf(stderr, "unexpected VM path\n"); return 2;
    }
    int abi = syscall(__NR_landlock_create_ruleset, NULL, 0, LANDLOCK_CREATE_RULESET_VERSION);
    if (abi < 4) { fprintf(stderr, "Landlock ABI 4 required; got %d\n", abi); return 1; }
    struct landlock_ruleset_attr rules = {
        .handled_access_fs =
            LANDLOCK_ACCESS_FS_EXECUTE | LANDLOCK_ACCESS_FS_WRITE_FILE |
            LANDLOCK_ACCESS_FS_READ_FILE | LANDLOCK_ACCESS_FS_READ_DIR |
            LANDLOCK_ACCESS_FS_REMOVE_DIR | LANDLOCK_ACCESS_FS_REMOVE_FILE |
            LANDLOCK_ACCESS_FS_MAKE_CHAR | LANDLOCK_ACCESS_FS_MAKE_DIR |
            LANDLOCK_ACCESS_FS_MAKE_REG | LANDLOCK_ACCESS_FS_MAKE_SOCK |
            LANDLOCK_ACCESS_FS_MAKE_FIFO | LANDLOCK_ACCESS_FS_MAKE_BLOCK |
            LANDLOCK_ACCESS_FS_MAKE_SYM | LANDLOCK_ACCESS_FS_REFER |
            LANDLOCK_ACCESS_FS_TRUNCATE,
        .handled_access_net = LANDLOCK_ACCESS_NET_BIND_TCP | LANDLOCK_ACCESS_NET_CONNECT_TCP,
    };
    int ruleset = syscall(__NR_landlock_create_ruleset, &rules, sizeof(rules), 0);
    if (ruleset < 0) { perror("landlock_create_ruleset"); return 1; }
    char path[512];
    #define ADD(suffix, access) do { \
        snprintf(path, sizeof(path), "%s%s", base, suffix); \
        if (add_path(ruleset, path, access) != 0) return 1; \
    } while (0)
    ADD("", LANDLOCK_ACCESS_FS_READ_DIR);
    ADD("/firecracker", LANDLOCK_ACCESS_FS_EXECUTE | LANDLOCK_ACCESS_FS_READ_FILE);
    ADD("/Image", LANDLOCK_ACCESS_FS_READ_FILE);
    ADD("/rootfs.ext4", LANDLOCK_ACCESS_FS_READ_FILE);
    ADD("/run", LANDLOCK_ACCESS_FS_READ_DIR | LANDLOCK_ACCESS_FS_READ_FILE |
        LANDLOCK_ACCESS_FS_WRITE_FILE | LANDLOCK_ACCESS_FS_MAKE_SOCK |
        LANDLOCK_ACCESS_FS_REMOVE_FILE | LANDLOCK_ACCESS_FS_TRUNCATE);
    if (add_path(ruleset, "/dev/kvm", LANDLOCK_ACCESS_FS_READ_FILE | LANDLOCK_ACCESS_FS_WRITE_FILE) != 0 ||
        add_path(ruleset, "/dev/null", LANDLOCK_ACCESS_FS_READ_FILE | LANDLOCK_ACCESS_FS_WRITE_FILE) != 0 ||
        add_path(ruleset, "/dev/urandom", LANDLOCK_ACCESS_FS_READ_FILE) != 0) return 1;
    if (prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0) != 0) { perror("no_new_privs"); return 1; }
    if (syscall(__NR_landlock_restrict_self, ruleset, 0) != 0) { perror("landlock_restrict_self"); return 1; }
    close(ruleset);
    if (argc == 3 && strcmp(argv[2], "--selftest") == 0) {
        snprintf(path, sizeof(path), "%s/model.env", base);
        int denied = open(path, O_RDONLY);
        int file_errno = errno;
        if (denied >= 0) close(denied);
        struct sockaddr_in loopback = { .sin_family = AF_INET, .sin_port = htons(8024), .sin_addr.s_addr = htonl(INADDR_LOOPBACK) };
        int s = socket(AF_INET, SOCK_STREAM, 0);
        int network = s < 0 ? -1 : connect(s, (struct sockaddr *)&loopback, sizeof(loopback));
        int network_errno = errno;
        if (s >= 0) close(s);
        printf("model.env errno=%d tcp-connect errno=%d\n", file_errno, network_errno);
        return (denied < 0 && file_errno == EACCES && network < 0 && network_errno == EACCES) ? 0 : 1;
    }
    snprintf(path, sizeof(path), "%s/firecracker", base);
    char api[512], config[512];
    snprintf(api, sizeof(api), "%s/run/firecracker.sock", base);
    snprintf(config, sizeof(config), "%s/run/vm.json", base);
    char *const args[] = {path, "--api-sock", api, "--config-file", config, NULL};
    execv(path, args);
    perror("execv firecracker");
    return 1;
}
