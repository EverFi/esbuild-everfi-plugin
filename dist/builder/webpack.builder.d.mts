import type { Compiler, Configuration } from 'webpack';
import type WebpackDevServer from 'webpack-dev-server';
import type { Item } from '../config/config.mjs';
import { BaseBuilder } from './base.builder.mjs';
export declare class WebpackBuilder extends BaseBuilder<Configuration> {
    protected readonly _config: Item<Configuration>;
    readonly hasInitialBuild = false;
    private readonly _rendererServer;
    private readonly _compiler;
    static create(config: Item<Configuration>): Promise<WebpackBuilder>;
    constructor(_config: Item<Configuration>, { compiler, rendererServer, }: {
        compiler: Compiler;
        rendererServer: WebpackDevServer;
    });
    build(): Promise<void>;
    dev(): Promise<void>;
}
