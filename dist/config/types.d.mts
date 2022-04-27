import { BuildOptions } from 'esbuild';
import { InlineConfig } from 'vite';
import { Configuration } from 'webpack';
import { TypeConfig } from './enums.mjs';
export declare type PossibleConfiguration = Configuration | BuildOptions | InlineConfig;
export interface ConfigMapping {
    [TypeConfig.esbuild]: BuildOptions;
    [TypeConfig.webpack]: Configuration;
    [TypeConfig.vite]: InlineConfig;
}
