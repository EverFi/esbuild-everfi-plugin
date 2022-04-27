class BaseBuilder {
  constructor(_config) {
    this._config = _config;
    this.env = this._config.isMain ? "Main" : this._config.isRenderer ? "Renderer" : "Unknown env";
  }
}
export {
  BaseBuilder
};
//# sourceMappingURL=base.builder.mjs.map
