import { BuildOptions } from 'esbuild';
import type { Item } from '../config/config.mjs';
import { BaseBuilder } from './base.builder.mjs';
export declare class EsbuildBuilder extends BaseBuilder<BuildOptions> {
    protected readonly _config: Item<BuildOptions>;
    readonly hasInitialBuild = true;
    private _builder;
    constructor(_config: Item<BuildOptions>);
    build(): Promise<void>;
    dev(start: () => void): Promise<void>;
    private _copyHtml;
}
