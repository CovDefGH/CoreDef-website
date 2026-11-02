import asyncio
import unittest

from server import ShellSession, serve_json_client


class FakeModel:
    def __init__(self):
        self.directories = []
        self.files = []

    async def directory(self, path):
        self.directories.append(path)
        if path == "/opt/coredef":
            return [("records", "dir"), ("patients.csv", "file"), ("config.json", "file")]
        if path == "/opt/coredef/records":
            return [("accounts.txt", "file"), ("archive", "dir"), ("notes.log", "file")]
        return [("system.log", "file"), ("settings", "dir"), ("readme.txt", "file")]

    async def file(self, path):
        self.files.append(path)
        return "model content for " + path + "\n"


class ShellTests(unittest.TestCase):
    def test_json_channel_preserves_session_and_returns_structured_output(self):
        async def check():
            model = FakeModel()
            server = await asyncio.start_server(lambda r, w: serve_json_client(r, w, model), "127.0.0.1", 0)
            try:
                port = server.sockets[0].getsockname()[1]
                reader, writer = await asyncio.open_connection("127.0.0.1", port)
                try:
                    greeting = await reader.readline()
                    self.assertIn(b'"prompt": "app@coredef:/opt/coredef$ "', greeting)
                    writer.write(b'{"command":"ls"}\n')
                    await writer.drain()
                    listing = await reader.readline()
                    self.assertIn(b"patients.csv", listing)
                    writer.write(b'{"command":"cd records"}\n')
                    await writer.drain()
                    changed = await reader.readline()
                    self.assertIn(b"/opt/coredef/records$ ", changed)
                finally:
                    writer.close()
                    await writer.wait_closed()
            finally:
                server.close()
                await server.wait_closed()

        asyncio.run(check())

    def test_directory_and_file_state_is_per_session(self):
        async def check():
            model = FakeModel()
            first = ShellSession(model)
            listing, _ = await first.run("ls")
            self.assertIn("patients.csv", listing)
            self.assertEqual(model.directories, ["/opt/coredef"])
            content, _ = await first.run("cat patients.csv")
            self.assertIn("model content for /opt/coredef/patients.csv", content)
            await first.run("cat patients.csv")
            self.assertEqual(model.files, ["/opt/coredef/patients.csv"])
            await first.run("cd records")
            self.assertEqual((await first.run("pwd"))[0], "/opt/coredef/records\n")
            await first.run("touch local.txt")
            self.assertIn("local.txt", (await first.run("ls"))[0])
            await first.run("rm local.txt")
            self.assertNotIn("local.txt", (await first.run("ls"))[0])
            second = ShellSession(model)
            self.assertEqual((await second.run("pwd"))[0], "/opt/coredef\n")
            self.assertNotIn("/opt/coredef/records/local.txt", second.entries)

        asyncio.run(check())

    def test_command_text_cannot_execute_host_shell(self):
        async def check():
            shell = ShellSession(FakeModel())
            output, _ = await shell.run("echo safe; touch /opt/coredef/host-file")
            self.assertIn("safe; touch", output)
            self.assertNotIn("/opt/coredef/host-file", shell.entries)
            output, _ = await shell.run("cat /etc/passwd")
            self.assertIn("No such file", output)
            output, _ = await shell.run("rm -rf /")
            self.assertIn("Permission denied", output)

        asyncio.run(check())


if __name__ == "__main__":
    unittest.main()
