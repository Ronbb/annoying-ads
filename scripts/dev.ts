import { createServer } from "vite";
import { join } from "path";

const viteConfigFile = "vite.config.ts";

const main = async () => {
  const server = await createServer({
    configFile: join(__dirname, "renderer", viteConfigFile),
  });

  server.listen();
};

main();
