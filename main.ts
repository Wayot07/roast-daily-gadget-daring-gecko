// One-Line Roast: The Gadget You Use Every Day
// Writes a single original roast line (1-200 chars) to /output/entry.txt.
// Node 22 stdlib only. No network, no environment reads, deterministic output.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname } from "node:path";

const ENTRY =
  "My realme C21Y ghost-types texts I never wrote and ignores the taps I did \u2014 a poltergeist with a data plan.";

const OUT = "/output/entry.txt";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  fail(`entry is ${chars} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  fail("entry must not be only whitespace");
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");

const back = readFileSync(OUT, "utf8");
if (back !== ENTRY) {
  fail("post-write readback differs from the entry");
}
if (ENTRY.endsWith("\n") || ENTRY.endsWith("\r")) {
  fail("entry must not end with a newline");
}
const backChars = [...back].length;
if (backChars !== chars) {
  fail(`post-write char count ${backChars} differs from ${chars}`);
}
if (back.endsWith("\n") || back.endsWith("\r")) {
  fail("written file must not end with a newline");
}
const sha = createHash("sha256").update(back, "utf8").digest("hex");

console.log(`wrote ${chars} chars (${Buffer.byteLength(ENTRY, "utf8")} bytes, sha256 ${sha}) to ${OUT}`);
console.log(ENTRY);
