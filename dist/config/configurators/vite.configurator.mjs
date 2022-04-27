import nodeModule from "node:module";
import { TypeConfig } from "../enums.mjs";
class ViteConfigurator {
  constructor(config) {
    this.config = config;
    this.type = TypeConfig.vite;
  }
  toBuilderConfig(partial) {
    var _a, _b;
    let external = (_b = (_a = partial == null ? void 0 : partial.build) == null ? void 0 : _a.rollupOptions) == null ? void 0 : _b.external;
    if (!Array.isArray(external)) {
      external = [external];
    }
    return {
      build: {
        emptyOutDir: true,
        rollupOptions: {
          external: [
            ...external ?? [],
            "electron",
            ...nodeModule.builtinModules
          ]
        }
      },
      server: {
        fs: {
          allow: ["../.."]
        }
      }
    };
  }
}
export {
  ViteConfigurator
};
//# sourceMappingURL=vite.configurator.mjs.map
