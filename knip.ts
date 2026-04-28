import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["build/index.ts", "static/scripts/audit-report/audit.ts"],
  project: ["build/**/*.ts", "static/scripts/**/*.ts"],
  ignore: ["src/types/config.ts"],
  ignoreExportsUsedInFile: true,
  ignoreDependencies: [],
};

export default config;
