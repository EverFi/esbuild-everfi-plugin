import type { Builder } from '../builder.mjs';
import type { Item } from '../config/config.mjs';
export declare abstract class BaseBuilder<T> implements Builder {
    protected readonly _config: Item<T>;
    readonly env: string;
    abstract readonly hasInitialBuild: boolean;
    protected constructor(_config: Item<T>);
    abstract build(): Promise<void>;
    abstract dev(start: () => void): void | Promise<void>;
}
