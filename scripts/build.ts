import { build } from "vite";
import { join } from "path";
import { cwd } from "process";
import { readFile, writeFile } from "fs/promises";

const viteConfigFile = "vite.config.ts";

const main = async () => {
  // build renderer
  await build({
    configFile: join(__dirname, "renderer", viteConfigFile),
  });

  // build main
  await build({
    configFile: join(__dirname, "main", viteConfigFile),
  });

  // write package.json
  const out = join(cwd(), "build");

  const config = JSON.parse(
    await readFile(join(cwd(), "package.json"), {
      encoding: "utf-8",
    })
  );

  await writeFile(
    join(out, "package.json"),
    JSON.stringify({
      main: "main/index.cjs.js",
      version: config["version"],
      devDependencies: {
        electron: config["devDependencies"]["electron"],
      },
      config: {
        forge: {},
      }, // make electron-forge stop finding parent directory
    })
  );
};

main();
