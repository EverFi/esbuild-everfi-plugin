import Joi from "joi";
import { Logger } from "../console.mjs";
import { EnvConfig } from "./config.mjs";
import { TypeConfig } from "./enums.mjs";
import { Yaml } from "./yaml.mjs";
const _logger = new Logger("Config/Validation");
const _schema = Joi.object({
  mainConfig: Joi.object({
    type: Joi.string().valid(TypeConfig.esbuild).required(),
    path: Joi.string().required(),
    src: Joi.string().required(),
    output: Joi.string().required()
  }).required(),
  rendererConfig: Joi.object({
    type: Joi.string().valid(TypeConfig.esbuild, TypeConfig.webpack, TypeConfig.vite).required(),
    path: Joi.string().required(),
    src: Joi.string().required(),
    output: Joi.string().required(),
    html: Joi.string().optional()
  }).optional().allow(null)
});
class ConfigFile {
  constructor(config) {
    this.config = config;
    if (this.config.rendererConfig === void 0) {
      this.config.rendererConfig = null;
    }
  }
  ensureValid() {
    const result = _schema.validate(this.config);
    if (result.error) {
      return _logger.end("Configuration file contains errors,", result.error.details.map((item) => item.message).join("; "));
    }
    return true;
  }
  toYaml() {
    return new Yaml({
      main: EnvConfig.fromYaml(this.config.mainConfig),
      renderer: this.config.rendererConfig !== null ? EnvConfig.fromYaml(this.config.rendererConfig) : null
    });
  }
}
export {
  ConfigFile
};
//# sourceMappingURL=validation.mjs.map
