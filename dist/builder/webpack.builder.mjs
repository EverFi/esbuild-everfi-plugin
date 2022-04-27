import { Logger } from "../console.mjs";
import { ConfigurationError } from "../errors/configuration-error.mjs";
import { BaseBuilder } from "./base.builder.mjs";
const _logger = new Logger("Builder/Webpack");
class WebpackBuilder extends BaseBuilder {
  constructor(_config, {
    compiler,
    rendererServer
  }) {
    super(_config);
    this._config = _config;
    this.hasInitialBuild = false;
    this._compiler = compiler;
    this._rendererServer = rendererServer;
  }
  static async create(config) {
    var _a, _b, _c;
    try {
      const webpack = (await import("webpack")).default;
      const WebpackDevServer = (await import("webpack-dev-server")).default;
      const compiler = webpack(config.config);
      const rendererServer = new WebpackDevServer({
        port: 9080,
        hot: true,
        client: {
          overlay: true
        }
      }, compiler);
      return new WebpackBuilder(config, { compiler, rendererServer });
    } catch (err) {
      if (err instanceof Error) {
        if (((_a = err.message) == null ? void 0 : _a.includes("Invalid configuration object")) && ((_b = err.message) == null ? void 0 : _b.includes("ValidationError"))) {
          _logger.end("Your webpack configuration is invalid. Message from webpack", err.message);
        }
        if ((_c = err.message) == null ? void 0 : _c.includes("MODULE_NOT_FOUND")) {
          _logger.end("It looks like you're trying to use webpack but it's not installed, try running `npm i -D webpack webpack-dev-server`");
        }
      }
      _logger.end("An unknown error occurred while trying to configure webpack", err);
      process.exit(1);
    }
  }
  build() {
    _logger.log("Building", this.env.toLowerCase());
    return new Promise((resolve, reject) => {
      if (this._compiler.running) {
        resolve();
        return;
      }
      this._compiler.run((err) => {
        if (err) {
          _logger.error(this.env, "error", err);
          reject(err);
        } else {
          _logger.log(this.env, "built");
          resolve();
        }
      });
    });
  }
  async dev() {
    if (this._config.isMain) {
      throw new ConfigurationError("mainConfig.type: webpack is not supported yet.");
    }
    try {
      await this._rendererServer.start();
    } catch (e) {
      if (e instanceof Error) {
        _logger.end(this.env, "WDS error", e);
      } else {
        _logger.log(this.env, "WDS starting");
      }
    }
  }
}
export {
  WebpackBuilder
};
//# sourceMappingURL=webpack.builder.mjs.map
