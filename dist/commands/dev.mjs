import { spawn } from "child_process";
import path from "node:path";
import { Cli } from "../cli.mjs";
import { CONFIG_FILE_NAME } from "../config/constants.mjs";
import { Logger } from "../console.mjs";
import { Worker } from "../worker.mjs";
const _isWindows = process.platform === "win32";
const _electronBin = _isWindows ? "electron.cmd" : "electron";
const _logger = new Logger("Commands/Dev");
class _ApplicationStarter {
  constructor(unknownInputs) {
    this._cleanupProcess();
    this._args = ["app/main/main.js", ...unknownInputs];
  }
  async start() {
    if (this._electronProcess) {
      try {
        this._kill();
      } catch (e) {
        _logger.end("Error occurred while killing latest main", e);
      }
      this._electronProcess = void 0;
    }
    _logger.log("Start application");
    this._electronProcess = spawn(path.resolve(`node_modules/.bin/${_electronBin}`), this._args, {
      stdio: "inherit"
    });
    this._cleanupElectronProcess();
  }
  _kill() {
    if (this._electronProcess) {
      this._electronProcess.removeAllListeners("close");
      if (_isWindows) {
        _logger.debug("kill electron process on windows");
        spawn("taskkill", ["/pid", `${this._electronProcess.pid}`, "/f", "/t"]);
      } else {
        _logger.debug("kill electron process on macOS/linux");
        const pid = this._electronProcess.pid;
        const killed = this._electronProcess.killed;
        this._electronProcess = void 0;
        if (pid !== void 0 && !killed) {
          process.kill(pid);
        }
      }
    }
  }
  _cleanupElectronProcess() {
    var _a;
    (_a = this._electronProcess) == null ? void 0 : _a.on("close", (code, signal) => {
      if (code === null) {
        _logger.error("Main Process exited with signal", signal);
        process.exit(1);
      }
      process.exit(code);
    });
  }
  _cleanupProcess() {
    const clean = (signal) => {
      process.on(signal, () => {
        var _a;
        _logger.log("Cleanup before exit...");
        _logger.debug("Signal", signal);
        if (!((_a = this._electronProcess) == null ? void 0 : _a.killed)) {
          this._kill();
        }
        process.exit(0);
      });
    };
    clean("SIGINT");
    clean("SIGTERM");
  }
}
class Dev extends Cli {
  static async create(cli, unknownInputs) {
    process.env.NODE_ENV = "development";
    _logger.debug("Creating worker");
    const worker = Worker.fromFile({
      file: CONFIG_FILE_NAME,
      env: "development"
    });
    _logger.debug("Created worker");
    const config = await worker.toConfigAsync();
    _logger.debug("Parsed config");
    const [mainBuilder, rendererBuilder] = await config.toBuildersAsync();
    _logger.debug("Created builders");
    return new Dev(cli, {
      mainBuilder,
      rendererBuilder,
      unknownInputs
    });
  }
  constructor(cli, {
    mainBuilder,
    rendererBuilder,
    unknownInputs
  }) {
    super(cli);
    this._applicationStarter = new _ApplicationStarter(unknownInputs);
    this._mainBuilder = mainBuilder;
    this._rendererBuilder = rendererBuilder;
  }
  async init() {
    var _a, _b;
    _logger.debug("Start");
    const start = () => this._applicationStarter.start();
    _logger.debug("Starting dev builders");
    await this._mainBuilder.dev(start);
    (_a = this._rendererBuilder) == null ? void 0 : _a.dev(start);
    _logger.debug("Started dev builders");
    _logger.debug("Starting initial builds");
    await Promise.all([
      this._mainBuilder.hasInitialBuild ? this._mainBuilder.build() : Promise.resolve(),
      ((_b = this._rendererBuilder) == null ? void 0 : _b.hasInitialBuild) ? this._rendererBuilder.build() : Promise.resolve()
    ]);
    _logger.debug("Initial builds finished");
    await this._applicationStarter.start();
  }
}
export {
  Dev
};
//# sourceMappingURL=dev.mjs.map
