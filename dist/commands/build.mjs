import path from "node:path";
import rimraf from "rimraf";
import { Cli } from "../cli.mjs";
import { CONFIG_FILE_NAME } from "../config/constants.mjs";
import { Logger } from "../console.mjs";
import { Worker } from "../worker.mjs";
const _logger = new Logger("Commands/Build");
function clean() {
  _logger.log("Cleaning");
  return new Promise((resolve, reject) => {
    rimraf(path.resolve("dist"), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
class Build extends Cli {
  constructor(cli) {
    super(cli);
  }
  static async create(cli) {
    return new Build(cli);
  }
  async init() {
    process.env.NODE_ENV = "production";
    _logger.debug("Start");
    if (this.cli.flags.clean) {
      await clean();
    }
    _logger.debug("Creating worker");
    const worker = Worker.fromFile({
      file: CONFIG_FILE_NAME,
      env: "production"
    });
    _logger.debug("Created worker");
    const config = await worker.toConfigAsync();
    _logger.debug("Parsed config");
    const [main, renderer] = await config.toBuildersAsync();
    _logger.debug("Created builders");
    _logger.log("Creating production build...");
    await Promise.all([
      main.build(),
      (renderer == null ? void 0 : renderer.build()) ?? await Promise.resolve()
    ]);
  }
}
export {
  Build
};
//# sourceMappingURL=build.mjs.map
