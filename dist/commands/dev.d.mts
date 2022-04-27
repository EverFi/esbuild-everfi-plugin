import { Builder } from '../builder.mjs';
import { Cli, CliResult } from '../cli.mjs';
export declare class Dev extends Cli {
    private readonly _mainBuilder;
    private readonly _rendererBuilder;
    private readonly _applicationStarter;
    static create(cli: CliResult, unknownInputs: string[]): Promise<Dev>;
    constructor(cli: CliResult, { mainBuilder, rendererBuilder, unknownInputs, }: {
        mainBuilder: Builder;
        rendererBuilder: Builder | null;
        unknownInputs: string[];
    });
    init(): Promise<void>;
}
