import assert from "node:assert/strict";
import { test } from "node:test";
import { aggregateCoverage } from "./check-project-coverage.mjs";

const metrics = ["lines", "statements", "functions", "branches"];

function file(path, covered, total) {
	return { path, ...Object.fromEntries(metrics.map((metric) => [metric, { covered, total }])) };
}

test("combines counts rather than averaging package percentages", () => {
	const result = aggregateCoverage(
		[
			{ owner: "a", files: [file("a/src/one.ts", 90, 100)] },
			{ owner: "b", files: [file("b/src/two.ts", 1, 10)] },
		],
		["a", "b"],
	);
	assert.equal(result.lines.covered, 91);
	assert.equal(result.lines.total, 110);
	assert.equal(result.lines.pct, (91 / 110) * 100);
});

test("rejects duplicate source ownership and missing packages", () => {
	assert.throws(() => aggregateCoverage([{ owner: "a", files: [file("shared.ts", 1, 1)] }, { owner: "b", files: [file("shared.ts", 1, 1)] }], ["a", "b"]), /duplicate source/i);
	assert.throws(() => aggregateCoverage([{ owner: "a", files: [file("a.ts", 1, 1)] }], ["a", "b"]), /missing package/i);
});

test("fails zero denominators and absent metrics", () => {
	for (const metric of metrics) {
		const zero = file("a.ts", 1, 1);
		zero[metric] = { covered: 0, total: 0 };
		assert.throws(() => aggregateCoverage([{ owner: "a", files: [zero] }], ["a"]), new RegExp(metric));
		const absent = file("a.ts", 1, 1);
		delete absent[metric];
		assert.throws(() => aggregateCoverage([{ owner: "a", files: [absent] }], ["a"]), new RegExp(metric));
	}
});

test("requires each metric to reach 80 percent", () => {
	const below = aggregateCoverage([{ owner: "a", files: [file("a.ts", 79, 100)] }], ["a"]);
	assert.equal(below.passes, false);
	assert.deepEqual(below.failedMetrics, metrics);
	const at = aggregateCoverage([{ owner: "a", files: [file("a.ts", 80, 100)] }], ["a"]);
	assert.equal(at.passes, true);
	assert.deepEqual(at.failedMetrics, []);
});
