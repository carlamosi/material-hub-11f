import { execSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// 1) Run the regular Vite build (client + server bundles into dist/)
execSync("npx vite build", { stdio: "inherit" });

// 2) Bundle dist/server/server.js into a single self-contained file with all
//    npm deps inlined — Vercel Edge functions reject bare `import "react"` etc.
execSync(
  [
    "npx esbuild dist/server/server.js",
    "--bundle",
    "--format=esm",
    "--platform=neutral",
    "--target=es2022",
    // Keep node: protocol imports as-is — Vercel Edge supports a curated subset.
    '--external:"node:*"',
    "--conditions=workerd,worker,browser,import,module,default",
    "--main-fields=module,main",
    "--outfile=dist/server-bundled/index.mjs",
    "--log-level=warning",
  ].join(" "),
  { stdio: "inherit" },
);

// 3) Assemble Vercel Build Output API v3 layout (.vercel/output/)
const out = ".vercel/output";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// Static client assets
cpSync("dist/client", join(out, "static"), { recursive: true });

// SSR edge function (one catch-all, name = "index")
const fnDir = join(out, "functions", "index.func");
mkdirSync(fnDir, { recursive: true });

// Copy the bundled server
cpSync("dist/server-bundled/index.mjs", join(fnDir, "index.mjs"));

// Adapter: bundled server exports `default = { fetch }` — Vercel Edge expects
// `default = (request) => Response`.
writeFileSync(
  join(fnDir, "entry.mjs"),
  `import server from './index.mjs';\n` +
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
