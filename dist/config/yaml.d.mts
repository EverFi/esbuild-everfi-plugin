import type { EnvConfig } from './config.mjs';
import { TypeConfig } from './enums.mjs';
export declare type YamlItem = {
    type: TypeConfig;
    path: string;
    src: string;
    output: string;
    html?: string;
};
export declare type YamlSkeleton = {
    mainConfig: YamlItem;
    rendererConfig: YamlItem | null;
};
export declare class Yaml {
    readonly main: EnvConfig;
    readonly renderer: EnvConfig | null;
    constructor({ main, renderer, }: {
        main: EnvConfig;
        renderer: EnvConfig | null;
    });
}
