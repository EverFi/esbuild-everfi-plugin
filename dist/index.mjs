#!/usr/bin/env node
import meow from "meow";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as url from "node:url";
import { commands } from "./commands/index.mjs";
const getVersion = async () => {
  const dirname = path.resolve(url.fileURLToPath(import.meta.url), "..");
  const pkgPath = path.resolve(dirname, "../package.json");
  const pkg = JSON.parse((await fs.readFile(pkgPath)).toString("utf-8"));
  return pkg.version;
};
const _cli = meow(`Usage
  $ electron-esbuild [command]

Commands
  dev
    Runs a development environment
  build
    Builds your application preparing for packaging

Examples
  $ electron-esbuild dev
  $ electron-esbuild build`, {
  version: await getVersion(),
  flags: {
    clean: {
      type: "boolean",
      default: true
    }
  },
  allowUnknownFlags: true,
  importMeta: import.meta
});
const [_command, ...unknownInputs] = _cli.input;
const _availableCommands = ["dev", "build"];
function isValidAction(command) {
  if (typeof command === "undefined" || !_availableCommands.includes(command)) {
    _cli.showHelp(0);
  }
  return true;
}
if (isValidAction(_command)) {
  const action = await commands[_command].create(_cli, unknownInputs);
  action.init().then(() => {
  });
}
//# sourceMappingURL=index.mjs.map
