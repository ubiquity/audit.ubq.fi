import esbuild from "esbuild";
import * as dotenv from "dotenv";

const typescriptEntries = ["static/scripts/rewards/index.ts", "static/scripts/audit-report/audit.ts"];
const cssEntries = ["static/styles/rewards/rewards.css", "static/styles/audit-report/audit.css"];
export const entries = [...typescriptEntries, ...cssEntries];

export const esBuildContext: esbuild.BuildOptions = {
  sourcemap: true,
  entryPoints: entries,
  bundle: true,
  minify: false,
  loader: {
    ".png": "dataurl",
    ".woff": "dataurl",
    ".woff2": "dataurl",
    ".eot": "dataurl",
    ".ttf": "dataurl",
    ".svg": "dataurl",
  },
  outdir: "static/out",
  define: createEnvDefines(["SUPABASE_URL", "SUPABASE_ANON_KEY"]),
};

esbuild
  .build(esBuildContext)
  .then(() => {
    console.log("\tesbuild complete");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

function createEnvDefines(envVarNames: string[]): Record<string, string> {
  const defines: Record<string, string> = {};
  dotenv.config();
  for (const name of envVarNames) {
    const envVar = process.env[name];
    if (envVar !== undefined) {
      defines[name] = JSON.stringify(envVar);
    } else {
      throw new Error(`Missing environment variable: ${name}`);
    }
  }
  return defines;
}
