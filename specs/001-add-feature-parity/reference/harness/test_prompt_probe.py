import unittest

from prompt_probe import prompt_flags, summarize_system


class PromptProbeTest(unittest.TestCase):
    def test_records_order_without_content(self):
        summary = summarize_system("private REPLACE_SENTINEL private APPEND_SENTINEL private")
        self.assertEqual(summary, {"replace_present": True, "append_present": True, "replace_before_append": True})
        self.assertNotIn("private", str(summary))

    def test_missing_or_reversed_markers_fail_order(self):
        self.assertFalse(summarize_system("APPEND_SENTINEL REPLACE_SENTINEL")["replace_before_append"])
        self.assertFalse(summarize_system("REPLACE_SENTINEL")["replace_before_append"])

    def test_file_mode_passes_both_synthetic_files(self):
        self.assertEqual(prompt_flags("files", "/tmp/synthetic"), [
            "--system-prompt-file", "/tmp/synthetic/replacement.txt",
            "--append-system-prompt-file", "/tmp/synthetic/append.txt",
        ])


if __name__ == "__main__":
    unittest.main()
