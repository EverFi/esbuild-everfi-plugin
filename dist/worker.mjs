import deepMerge from "deepmerge";
import { buildSync } from "esbuild";
import has from "has";
import yaml from "js-yaml";
import fs from "node:fs";
import fsAsync from "node:fs/promises";
import path from "node:path";
import { Config, Item } from "./config/config.mjs";
import { Target } from "./config/enums.mjs";
import { configByEnv } from "./config/utils.mjs";
import { ConfigFile } from "./config/validation.mjs";
import { Logger } from "./console.mjs";
const _outMain = "out_main.mjs";
const _outRenderer = "out_renderer.mjs";
const _logger = new Logger("Config");
const _cwd = process.cwd();
const _resolve = (...paths) => path.resolve(_cwd, ...paths);
const _require = async (module) => {
  return await import(`file://${module}`);
};
const _silentRemove = async (file) => {
  try {
    await fsAsync.unlink(file);
  } catch {
  }
};
const _buildUserConfig = async (configPath, target) => {
  const outName = target === Target.main ? _outMain : _outRenderer;
  const out = _resolve(outName);
  buildSync({
    target: "node16",
    outfile: out,
    entryPoints: [configPath],
    platform: "node",
    format: "esm"
  });
  try {
    let userConfig = await _require(out);
    if (has(userConfig, "default")) {
      userConfig = userConfig.default;
    }
    await _silentRemove(out);
    return userConfig;
  } catch (e) {
    await _silentRemove(out);
    _logger.error("electron-esbuild could not load file", configPath);
    _logger.error("below stack:");
    _logger.end(e);
    process.exit(1);
  }
};
const _loadYaml = (file) => {
  let fileContent = "";
  try {
    fileContent = fs.readFileSync(path.resolve(file)).toString();
  } catch (e) {
    _logger.end("Unable to find electron-esbuild config file at:", file);
  }
  const configFile = new ConfigFile(yaml.load(fileContent));
  configFile.ensureValid();
  return configFile.toYaml();
};
class _WorkerConfigurator {
  constructor({
    main,
    renderer
  }) {
    this.main = main;
    this.renderer = renderer;
  }
  static fromYaml(yaml2) {
    const main = yaml2.main.toConfigurator();
    const renderer = yaml2.renderer ? yaml2.renderer.toConfigurator() : null;
    return new this({ main, renderer });
  }
}
class Worker {
  constructor({
    file,
    env,
    main,
    renderer,
    configurator
  }) {
    this._file = file;
    this.env = env;
    this._main = main;
    this._renderer = renderer;
    this.configurator = configurator;
  }
  static fromFile({ file, env }) {
    var _a;
    const yaml2 = _loadYaml(file);
    const configurator = _WorkerConfigurator.fromYaml(yaml2);
    const main = configByEnv({
      dev: env === "development",
      type: configurator.main.type
    });
    const renderer = configByEnv({
      dev: env === "development",
      type: ((_a = configurator.renderer) == null ? void 0 : _a.type) ?? null
    });
    return new this({
      file,
      env,
      configurator,
      main,
      renderer
    });
  }
  async toConfigAsync() {
    var _a;
    const mainConfig = this.configurator.main.config;
    const rendererConfig = ((_a = this.configurator.renderer) == null ? void 0 : _a.config) ?? null;
    if (!fs.existsSync(mainConfig.path)) {
      _logger.end(`Main config file '${mainConfig.path}' not found. Check your ${this._file} file`);
    }
    if (rendererConfig !== null && !fs.existsSync(rendererConfig.path)) {
      _logger.end(`Renderer config file '${rendererConfig.path}' not found. Check your ${this._file} file`);
    }
    process.env.NODE_ENV = this.env;
    let mainConfigPath = _resolve(mainConfig.path);
    let rendererConfigPath = rendererConfig !== null ? _resolve(rendererConfig.path) : null;
    const userMainConfig = await _buildUserConfig(mainConfigPath, Target.main);
    const userRendererConfig = rendererConfigPath ? await _buildUserConfig(rendererConfigPath, Target.renderer) : null;
    if (typeof userMainConfig === "function" || typeof userRendererConfig === "function") {
      const configFileThatIsWrong = [];
      if (typeof userMainConfig === "function") {
        configFileThatIsWrong.push("main");
      }
      if (typeof userRendererConfig === "function") {
        configFileThatIsWrong.push("renderer");
      }
      const plural = configFileThatIsWrong.length > 1 ? "s" : "";
      _logger.end("Starting electron-esbuild v1.2.0, you need to export an object from your esbuild/webpack configuration file", `Check your ${configFileThatIsWrong.join(", ")} configuration file${plural}`);
    }
    let mainConfigFinal = deepMerge(this._main, userMainConfig, {
      clone: false
    });
    let rendererConfigFinal = rendererConfig !== null && userRendererConfig !== null ? deepMerge(this._renderer, userRendererConfig, { clone: false }) : null;
    mainConfigFinal = deepMerge(this.configurator.main.toBuilderConfig(this._main, mainConfigFinal, Target.main), mainConfigFinal, { clone: false });
    rendererConfigFinal = rendererConfigFinal !== null ? this.configurator.renderer ? deepMerge(this.configurator.renderer.toBuilderConfig(this._renderer, rendererConfigFinal, Target.renderer), rendererConfigFinal, { clone: false }) : null : null;
    return new Config({
      main: new Item({
        config: mainConfigFinal,
        fileConfig: mainConfig,
        target: Target.main
      }),
      renderer: new Item({
        config: rendererConfigFinal,
        fileConfig: rendererConfig,
        target: Target.renderer
      })
    });
  }
}
export {
  Worker
};
//# sourceMappingURL=worker.mjs.map
