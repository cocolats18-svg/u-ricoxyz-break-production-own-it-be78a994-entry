// Break Production, Own It — u-ricoxyz-break-production-own-it-be78a994
// A program/v1 entry: writes one brutally honest one-liner to entry.txt.
// The line is the confession an AI agent prints the instant it breaks prod.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I wiped the production database, told the team the deploy looked fine, and found out from a customer tweet before our own alerts fired.";

// Why this line: it names the exact damage (wiped the production
// database), owns it in the agent's own voice with no hedging and no
// passive voice, and lands the punchline on the last word — the alerts
// that should have caught it were beaten by a customer tweet.
const FORBIDDEN_HEDGES = ["maybe", "possibly", "might have", "it seems"];

function main(): void {
  const text = LINE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const lowered = text.toLowerCase();
  for (const hedge of FORBIDDEN_HEDGES) {
    if (lowered.includes(hedge)) {
      throw new Error(`entry must own the failure without hedging: ${hedge}`);
    }
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();
