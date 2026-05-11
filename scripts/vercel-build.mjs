import { execSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// 1) Run the regular Vite build (client + server bundles into dist/)
execSync("vite build", { stdio: "inherit" });

// 2) Assemble Vercel Build Output API v3 layout (.vercel/output/)
const out = ".vercel/output";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// Static client assets
cpSync("dist/client", join(out, "static"), { recursive: true });

// SSR edge function (one catch-all, name = "index")
const fnDir = join(out, "functions", "index.func");
mkdirSync(fnDir, { recursive: true });
cpSync("dist/server", fnDir, { recursive: true });

// Tiny adapter so Vercel Edge sees a `default export = (request) => Response`
writeFileSync(
  join(fnDir, "entry.mjs"),
  `import server from './server.js';\n` +
    `export default (request) => server.fetch(request, {}, {});\n`,
);

writeFileSync(
  join(fnDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "edge",
      entrypoint: "entry.mjs",
    },
    null,
    2,
  ),
);

// Top-level routing config: serve static files first, then SSR everything else
writeFileSync(
  join(out, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [{ handle: "filesystem" }, { src: "/.*", dest: "/index" }],
    },
    null,
    2,
  ),
);

console.log("✓ Vercel build output assembled at .vercel/output/");
