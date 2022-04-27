import depsTree from "dependency-tree-81";
import path from "node:path";
function getDeps(file) {
  return depsTree.toList({
    filename: file,
    directory: path.dirname(file),
    filter: (filePath) => filePath.indexOf("node_modules") === -1
  });
}
export {
  getDeps
};
//# sourceMappingURL=deps.mjs.map
