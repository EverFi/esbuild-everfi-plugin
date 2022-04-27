import deepMerge from "deepmerge";
import nodeModule from "node:module";
import path from "node:path";
import { Target, TypeConfig } from "../enums.mjs";
class EsbuildConfigurator {
  constructor(config) {
    this.config = config;
    this.type = TypeConfig.esbuild;
  }
  toBuilderConfig(partial, userConfig, target) {
    var _a;
    const additional = {};
    const out = path.resolve(process.cwd(), this.config.output, target === Target.main ? "main.js" : "index.js");
    if (((_a = userConfig.entryPoints) == null ? void 0 : _a.length) ?? 1 > 1) {
      additional.outdir = path.dirname(out);
    } else {
      additional.outfile = out;
    }
    return deepMerge(deepMerge(partial, {
      external: [
        ...partial.external ?? [],
        "electron",
        ...nodeModule.builtinModules
      ]
    }, { clone: false }), additional, { clone: false });
  }
}
export {
  EsbuildConfigurator
};
//# sourceMappingURL=esbuild.configurator.mjs.map
