import { api } from "@electron-forge/core";
import { join } from "path";
import { cwd } from "process";
import { rm } from "fs/promises";

const main = async () => {
  const build = join(cwd(), "build");
  const dist = join(cwd(), "dist");

  try {
    await rm(dist, { recursive: true });
  } catch (_) {}

  await api.package({
    dir: build,
    outDir: dist,
  });
};

main();
