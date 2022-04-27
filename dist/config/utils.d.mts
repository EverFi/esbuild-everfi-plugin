import { TypeConfig } from './enums.mjs';
import { PossibleConfiguration } from './types.mjs';
export declare function configByEnv({ dev, type, }: {
    dev: boolean;
    type: TypeConfig | null;
}): Partial<PossibleConfiguration>;
