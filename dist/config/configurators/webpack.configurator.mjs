import deepMerge from "deepmerge";
import path from "node:path";
import { Target, TypeConfig } from "../enums.mjs";
class WebpackConfigurator {
  constructor(config) {
    this.config = config;
    this.type = TypeConfig.webpack;
  }
  toBuilderConfig(partial, _, target) {
    return deepMerge(partial, {
      output: {
        filename: target === Target.main ? "main.js" : "index.js",
        path: path.resolve(process.cwd(), this.config.output)
      }
    }, { clone: false });
  }
}
export {
  WebpackConfigurator
};
//# sourceMappingURL=webpack.configurator.mjs.map
