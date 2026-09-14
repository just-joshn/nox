import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

test("blocks external fetch before network access", () => {
	const run = spawnSync(process.execPath, ["--import", new URL("./offline-test-guard.mjs", import.meta.url).pathname, "-e", "fetch('https://example.com').catch(error => { process.stderr.write(error.message); process.exitCode = 1 })"], { encoding: "utf8" });
	assert.equal(run.status, 1);
	assert.match(run.stderr, /offline test blocked external network/);
});

test("blocks external sockets before connection", () => {
	const guard = new URL("./offline-test-guard.mjs", import.meta.url).pathname;
	const run = spawnSync(process.execPath, ["--import", guard, "-e", "import net from 'node:net'; net.connect({ host: 'example.com', port: 443 })"], { encoding: "utf8" });
	assert.notEqual(run.status, 0);
	assert.match(run.stderr, /offline test blocked external network/);
});

test("does not treat a 127-prefixed hostname as loopback", () => {
	const guard = new URL("./offline-test-guard.mjs", import.meta.url).pathname;
	const run = spawnSync(process.execPath, ["--import", guard, "-e", "import net from 'node:net'; net.connect({ host: '127.example.com', port: 443 })"], { encoding: "utf8" });
	assert.notEqual(run.status, 0);
	assert.match(run.stderr, /offline test blocked external network/);
});
