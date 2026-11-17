#!/usr/bin/env python3
"""Small protocol check without a Groq call or a key."""

import threading
import unittest

from model_broker import Broker, estimated_size


class BrokerTest(unittest.TestCase):
    def test_listing_cached_but_file_regenerated(self):
        broker = Broker.__new__(Broker)
        broker.lock = threading.RLock()
        broker.entries = {}
        broker.real_dirs = {}
        calls = []

        def complete(prompt, tokens, json_mode=False):
            calls.append(prompt)
            if json_mode:
                return '{"entries":[{"name":"ops.txt","type":"file"},{"name":"docs","type":"dir"},{"name":"reports.csv","type":"file"}]}'
            return "Operational record " + str(len(calls)) + ": " + "A" * 180

        broker.complete = complete
        listing = broker.request("LIST_REAL /")
        self.assertEqual(listing, broker.request("LIST_REAL /"))
        self.assertEqual(broker.request("STAT /ops.txt"), ("file " + str(estimated_size("/ops.txt"))).encode())
        self.assertEqual(len(calls), 1)
        first = broker.request("READ /ops.txt")
        second = broker.request("READ /ops.txt")
        self.assertNotEqual(first, second)
        self.assertEqual(len(calls), 3)
        self.assertFalse(hasattr(broker, "files"))

    def test_removes_outer_markdown_fence(self):
        broker = Broker.__new__(Broker)
        broker.complete = lambda *args: "```yaml\nname: service\n" + "entry: enabled\n" * 20 + "```"
        self.assertTrue(broker.file("/config.yaml").startswith(b"name: service"))


if __name__ == "__main__":
    unittest.main()
