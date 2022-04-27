import { TypeConfig } from './config/enums.mjs';
export declare function unsupportedType(type: TypeConfig, env?: 'main' | 'renderer'): never;
export declare class Logger {
    private namespace;
    constructor(namespace: string);
    log(...args: unknown[]): void;
    debug(...args: unknown[]): void;
    error(...args: unknown[]): void;
    end(...args: unknown[]): never;
}
