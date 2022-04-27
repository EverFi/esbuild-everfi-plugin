import { BuildOptions } from 'esbuild';
import type { EnvConfig } from '../config.mjs';
import { Target, TypeConfig } from '../enums.mjs';
import type { Configurator } from './base.configurator.mjs';
export declare class EsbuildConfigurator implements Configurator<TypeConfig.esbuild> {
    readonly config: EnvConfig;
    readonly type = TypeConfig.esbuild;
    constructor(config: EnvConfig);
    toBuilderConfig(partial: Partial<BuildOptions>, userConfig: BuildOptions, target: Target): BuildOptions;
}
