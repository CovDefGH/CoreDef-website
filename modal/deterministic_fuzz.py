"""Reproducible, on-demand text generation for fuzz-response documents.

Deploy with `modal deploy modal/deterministic_fuzz.py` from the modalcd profile.
No generated responses are written to a Volume or container filesystem.
"""

import hashlib
import time
import modal


APP_NAME = "coredef-fuzz-deterministic"
MODEL = "ibm-granite/granite-3.1-2b-instruct"
REVISION = "bbc2aed595bd38bd770263dc3ab831db9794441d"


def download_model():
    from huggingface_hub import snapshot_download

    snapshot_download(repo_id=MODEL, revision=REVISION, local_dir="/models/fuzz")


image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install("vllm==0.14.0", "huggingface_hub==0.35.3")
    .env(
        {
            "VLLM_ENABLE_V1_MULTIPROCESSING": "0",
            "VLLM_BATCH_INVARIANT": "1",
            "CUBLAS_WORKSPACE_CONFIG": ":4096:8",
            "HF_HUB_DISABLE_TELEMETRY": "1",
            "VLLM_NO_USAGE_STATS": "1",
        }
    )
    .run_function(download_model)
)

app = modal.App(APP_NAME)


@app.cls(
    image=image,
    gpu="L40S",
    max_containers=1,
    scaledown_window=60,
    timeout=300,
)
class Generator:
    @modal.enter()
    def load(self):
        from vllm import LLM

        self.llm = LLM(
            model="/models/fuzz",
            tokenizer="/models/fuzz",
            max_model_len=8192,
            max_num_seqs=1,
            gpu_memory_utilization=0.85,
            seed=0,
            trust_remote_code=False,
            disable_log_stats=True,
            async_scheduling=False,
            enable_chunked_prefill=False,
            attention_config={"backend": "FLASH_ATTN"},
        )
        self.tokenizer = self.llm.get_tokenizer()
    @modal.method()
    def generate(self, prompt: str, seed: int = 0, max_tokens: int = 2048, expected_sha256: str | None = None) -> dict:
        return self._generate(prompt, seed, max_tokens, expected_sha256)

    @modal.fastapi_endpoint(method="POST", requires_proxy_auth=True)
    def generate_http(self, payload: dict) -> dict:
        return self._generate(
            payload.get("prompt"),
            payload.get("seed", 0),
            payload.get("max_tokens", 2048),
            payload.get("expected_sha256"),
        )

    def _generate(self, prompt: str, seed: int, max_tokens: int, expected_sha256: str | None) -> dict:
        from vllm import SamplingParams

        if not isinstance(prompt, str) or not 1 <= len(prompt) <= 12000:
            raise ValueError("prompt must contain 1-12000 characters")
        if not isinstance(seed, int) or not 0 <= seed < 2**32:
            raise ValueError("seed must be a 32-bit unsigned integer")
        if not isinstance(max_tokens, int) or not 1 <= max_tokens <= 4096:
            raise ValueError("max_tokens must be in 1-4096")
        if expected_sha256 is not None and (
            not isinstance(expected_sha256, str)
            or len(expected_sha256) != 64
            or any(c not in "0123456789abcdef" for c in expected_sha256)
        ):
            raise ValueError("expected_sha256 must be a lowercase SHA-256 hex digest")
        request = self.tokenizer.apply_chat_template(
            [
                {"role": "system", "content": "Write only the requested document. No preface."},
                {"role": "user", "content": prompt},
            ],
            tokenize=False,
            add_generation_prompt=True,
        )
        seen = set()
        for _ in range(3):
            result = self.llm.generate(
                [request],
                SamplingParams(temperature=0, top_p=1, seed=seed, max_tokens=max_tokens),
                use_tqdm=False,
            )[0]
            content = result.outputs[0].text
            digest = hashlib.sha256(content.encode("utf-8")).hexdigest()
            if digest == expected_sha256 or (expected_sha256 is None and digest in seen):
                return {"content": content, "sha256": digest, "model": MODEL, "revision": REVISION}
            seen.add(digest)
        raise RuntimeError("generation did not reproduce the expected SHA-256")


@app.local_entrypoint()
def verify():
    prompt = (
        "Write a 300-word internal engineering service report with dated maintenance "
        "events, owners, and concrete operational details. Return only the report."
    )
    generator = Generator()
    start = time.monotonic()
    first = generator.generate.remote(prompt, seed=12345, max_tokens=640)
    second = generator.generate.remote(prompt, seed=12345, max_tokens=640, expected_sha256=first["sha256"])
    if first["content"] != second["content"]:
        raise RuntimeError("repeatability check failed")
    print(f"repeatability check passed: {first['sha256']}; elapsed {time.monotonic() - start:.1f}s")
