import { InlineConfig } from 'vite';
import type { EnvConfig } from '../config.mjs';
import { TypeConfig } from '../enums.mjs';
import type { Configurator } from './base.configurator.mjs';
export declare class ViteConfigurator implements Configurator<TypeConfig.vite> {
    readonly config: EnvConfig;
    readonly type = TypeConfig.vite;
    constructor(config: EnvConfig);
    toBuilderConfig(partial: Partial<InlineConfig>): InlineConfig;
}
