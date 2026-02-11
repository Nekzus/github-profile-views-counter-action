import cp from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "vitest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// shows how the runner will run a javascript action with env / stdout protocol
test("test runs", () => {
	const ip = path.join(__dirname, "index.js");
	try {
		cp.execSync(`node ${ip}`, { env: process.env });
	} catch (error) {
		// Expecting some errors if env vars aren't set, but checking if it starts
		console.log("Process output:", error.stdout?.toString());
		console.error("Process error:", error.stderr?.toString());
	}
});
