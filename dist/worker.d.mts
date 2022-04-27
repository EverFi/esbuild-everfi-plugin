import { Config } from './config/config.mjs';
import { Configurator } from './config/configurators/base.configurator.mjs';
import { TypeConfig } from './config/enums.mjs';
import { PossibleConfiguration } from './config/types.mjs';
import { Yaml } from './config/yaml.mjs';
import { Env } from './env.mjs';
declare class _WorkerConfigurator {
    readonly main: Configurator<TypeConfig>;
    readonly renderer: Configurator<TypeConfig> | null;
    constructor({ main, renderer, }: {
        main: Configurator<TypeConfig>;
        renderer: Configurator<TypeConfig> | null;
    });
    static fromYaml(yaml: Yaml): _WorkerConfigurator;
}
export declare class Worker<M extends PossibleConfiguration, R extends PossibleConfiguration> {
    private readonly _file;
    private readonly _main;
    private readonly _renderer;
    readonly env: Env;
    readonly configurator: _WorkerConfigurator;
    constructor({ file, env, main, renderer, configurator, }: {
        file: string;
        env: Env;
        configurator: _WorkerConfigurator;
        main: Partial<M>;
        renderer: Partial<R>;
    });
    static fromFile<M extends PossibleConfiguration, R extends PossibleConfiguration>({ file, env }: {
        file: string;
        env: Env;
    }): Worker<M, R>;
    toConfigAsync(): Promise<Config<M, R>>;
}
export {};
