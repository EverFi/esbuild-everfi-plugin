import { Builder } from '../builder.mjs';
import { Configurator } from './configurators/base.configurator.mjs';
import { Target, TypeConfig } from './enums.mjs';
import { PossibleConfiguration } from './types.mjs';
import { YamlItem } from './yaml.mjs';
export declare class EnvConfig {
    readonly type: TypeConfig;
    readonly path: string;
    readonly src: string;
    readonly output: string;
    readonly html?: string;
    constructor({ type, path, src, output, html, }: {
        type: TypeConfig;
        path: string;
        src: string;
        output: string;
        html?: string;
    });
    static fromYaml(yaml: YamlItem): EnvConfig;
    toConfigurator(): Configurator<TypeConfig>;
}
export declare class Item<T extends PossibleConfiguration | null = PossibleConfiguration, F extends EnvConfig | null = EnvConfig | null> {
    readonly config: T;
    readonly fileConfig: F;
    readonly target: Target;
    readonly isVite: boolean;
    readonly isWebpack: boolean;
    readonly isEsbuild: boolean;
    readonly isMain: boolean;
    readonly isRenderer: boolean;
    constructor({ config, fileConfig, target, }: {
        config: T;
        fileConfig: F;
        target: Target;
    });
    toBuilderAsync(): Promise<Builder | null>;
}
export declare class Config<M extends PossibleConfiguration, R extends PossibleConfiguration> {
    readonly main: Item<M, EnvConfig>;
    readonly renderer: Item<R | null>;
    constructor({ main, renderer, }: {
        main: Item<M, EnvConfig>;
        renderer: Item<R | null>;
    });
    toBuildersAsync(): Promise<readonly [Builder, Builder | null]>;
}
