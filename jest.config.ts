import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	verbose: true,
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/tests/**.test.ts"]
};

export default config;
