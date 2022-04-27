import { Configuration } from 'webpack';
import type { EnvConfig } from '../config.mjs';
import { Target, TypeConfig } from '../enums.mjs';
import type { Configurator } from './base.configurator.mjs';
export declare class WebpackConfigurator implements Configurator<TypeConfig.webpack> {
    readonly config: EnvConfig;
    readonly type = TypeConfig.webpack;
    constructor(config: EnvConfig);
    toBuilderConfig(partial: Partial<Configuration>, _: Configuration, target: Target): Configuration;
}
