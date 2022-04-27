import { TypeConfig } from "./enums.mjs";
function configByEnv({
  dev,
  type
}) {
  if (type === null) {
    return {};
  }
  if (dev) {
    switch (type) {
      case TypeConfig.esbuild:
        return {
          incremental: true,
          sourcemap: "inline",
          define: {
            "process.env.NODE_ENV": `'${process.env.NODE_ENV}'`
          }
        };
      case TypeConfig.webpack:
        return {
          mode: "development",
          devtool: "eval-source-map"
        };
      case TypeConfig.vite:
        return {};
    }
  }
  switch (type) {
    case TypeConfig.esbuild:
      return {
        sourcemap: "external",
        minify: true,
        define: {
          "process.env.NODE_ENV": `'${process.env.NODE_ENV}'`
        }
      };
    case TypeConfig.webpack:
      return { mode: "production", devtool: "source-map" };
    case TypeConfig.vite:
      return {};
  }
}
export {
  configByEnv
};
//# sourceMappingURL=utils.mjs.map
