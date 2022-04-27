import type { build, createServer, InlineConfig } from 'vite';
import type { Item } from '../config/config.mjs';
import { BaseBuilder } from './base.builder.mjs';
declare type Builder = typeof build;
declare type ServerFactory = typeof createServer;
export declare class ViteBuilder extends BaseBuilder<InlineConfig> {
    protected readonly _config: Item<InlineConfig>;
    readonly hasInitialBuild = false;
    private readonly _inlineConfig;
    private readonly _viteBuild;
    private readonly _viteCreateServer;
    static create(config: Item<InlineConfig>): Promise<ViteBuilder>;
    constructor(_config: Item<InlineConfig>, { build: vBuild, createServer: vCreateServer, }: {
        build: Builder;
        createServer: ServerFactory;
    });
    build(): Promise<void>;
    dev(): Promise<void>;
}
export {};
