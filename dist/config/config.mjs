import { EsbuildBuilder } from "../builder/esbuild.builder.mjs";
import { ViteBuilder } from "../builder/vite.builder.mjs";
import { WebpackBuilder } from "../builder/webpack.builder.mjs";
import { unsupportedType } from "../console.mjs";
import { EsbuildConfigurator } from "./configurators/esbuild.configurator.mjs";
import { ViteConfigurator } from "./configurators/vite.configurator.mjs";
import { WebpackConfigurator } from "./configurators/webpack.configurator.mjs";
import { Target, TypeConfig } from "./enums.mjs";
class EnvConfig {
  constructor({
    type,
    path,
    src,
    output,
    html
  }) {
    this.type = type;
    this.path = path;
    this.src = src;
    this.output = output;
    this.html = html;
  }
  static fromYaml(yaml) {
    return new this({
      type: yaml.type,
      path: yaml.path,
      src: yaml.src,
      output: yaml.output,
      html: yaml.html
    });
  }
  toConfigurator() {
    switch (this.type) {
      case TypeConfig.esbuild:
        return new EsbuildConfigurator(this);
      case TypeConfig.webpack:
        return new WebpackConfigurator(this);
      case TypeConfig.vite:
        return new ViteConfigurator(this);
      default:
        unsupportedType(this.type);
    }
  }
}
class Item {
  constructor({
    config,
    fileConfig,
    target
  }) {
    var _a, _b, _c;
    this.config = config;
    this.fileConfig = fileConfig;
    this.target = target;
    this.isVite = ((_a = this.fileConfig) == null ? void 0 : _a.type) === TypeConfig.vite;
    this.isWebpack = ((_b = this.fileConfig) == null ? void 0 : _b.type) === TypeConfig.webpack;
    this.isEsbuild = ((_c = this.fileConfig) == null ? void 0 : _c.type) === TypeConfig.esbuild;
    this.isMain = this.target === Target.main;
    this.isRenderer = this.target === Target.renderer;
  }
  async toBuilderAsync() {
    if (this.isEsbuild) {
      return new EsbuildBuilder(this);
    } else if (this.isWebpack) {
      return await WebpackBuilder.create(this);
    } else if (this.isVite) {
      return await ViteBuilder.create(this);
    }
    if (this.fileConfig !== null) {
      unsupportedType(this.fileConfig.type, this.isMain ? "main" : "renderer");
    }
    return null;
  }
}
class Config {
  constructor({
    main,
    renderer
  }) {
    this.main = main;
    this.renderer = renderer;
  }
  async toBuildersAsync() {
    return [
      await this.main.toBuilderAsync(),
      await this.renderer.toBuilderAsync()
    ];
  }
}
export {
  Config,
  EnvConfig,
  Item
};
//# sourceMappingURL=config.mjs.map
