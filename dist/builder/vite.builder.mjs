var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import path from "node:path";
import { Logger, unsupportedType } from "../console.mjs";
import { BaseBuilder } from "./base.builder.mjs";
const _logger = new Logger("Builder/Vite");
class ViteBuilder extends BaseBuilder {
  constructor(_config, {
    build: vBuild,
    createServer: vCreateServer
  }) {
    super(_config);
    this._config = _config;
    this.hasInitialBuild = false;
    var _a;
    if (!_config.fileConfig) {
      _logger.end("No file config");
      process.exit(0);
    }
    this._viteBuild = vBuild;
    this._viteCreateServer = vCreateServer;
    this._inlineConfig = {
      configFile: path.resolve(process.cwd(), _config.fileConfig.path),
      root: path.resolve(process.cwd(), path.dirname(_config.fileConfig.src)),
      base: "",
      build: {
        outDir: path.resolve(process.cwd(), (_a = _config.fileConfig) == null ? void 0 : _a.output)
      }
    };
  }
  static async create(config) {
    try {
      const { build: vBuild, createServer: vCreateServer } = await import("vite");
      return new this(config, { build: vBuild, createServer: vCreateServer });
    } catch (err) {
      if (err instanceof Error && err.message.includes("MODULE_NOT_FOUND")) {
        _logger.end("It looks like you're trying to use vite but it's not installed, try running `npm i -D vite`");
      }
      _logger.end("ViteBuilder encountered an unexpected error", err);
      process.exit(1);
    }
  }
  async build() {
    if (!this._config.fileConfig) {
      _logger.end("No file config");
      return;
    }
    if (this._config.isMain) {
      _logger.debug("Vite cannot be used in the main process");
      unsupportedType(this._config.fileConfig.type, "main");
    }
    _logger.log("Building", this.env.toLowerCase());
    await this._viteBuild(this._inlineConfig);
    _logger.log(this.env, "built");
  }
  async dev() {
    if (!this._config.fileConfig) {
      _logger.end("No file config");
      return;
    }
    if (this._config.isMain) {
      _logger.debug("Vite cannot be used in the main process");
      unsupportedType(this._config.fileConfig.type, "main");
    }
    if (this._config.isRenderer) {
      _logger.log("Start vite dev server");
      const server = await this._viteCreateServer(__spreadProps(__spreadValues({}, this._inlineConfig), {
        server: {
          port: 9080
        }
      }));
      await server.listen();
      process.on("exit", async () => {
        await server.close();
      });
    }
  }
}
export {
  ViteBuilder
};
//# sourceMappingURL=vite.builder.mjs.map
