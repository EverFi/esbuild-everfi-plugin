import { track } from "./track.mjs";
function unsupportedType(type, env) {
  const args = [track(), "unsupported type", type];
  if (env) {
    args.push("for", env);
  }
  console.error(...args);
  process.exit(1);
}
class Logger {
  constructor(namespace) {
    this.namespace = namespace;
  }
  log(...args) {
    console.log(track(), `(${this.namespace})`, ...args);
  }
  debug(...args) {
    if ((process.env.DEBUG ?? "").trim() !== "") {
      console.log(track(), `(${this.namespace})`, ...args, "[DEBUG]");
    }
  }
  error(...args) {
    console.error(track(), `(${this.namespace})`, ...args);
  }
  end(...args) {
    this.error(...args);
    process.exit(1);
  }
}
export {
  Logger,
  unsupportedType
};
//# sourceMappingURL=console.mjs.map
