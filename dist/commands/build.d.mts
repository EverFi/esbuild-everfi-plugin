import { Cli, CliResult } from '../cli.mjs';
export declare class Build extends Cli {
    constructor(cli: CliResult);
    static create(cli: CliResult): Promise<Build>;
    init(): Promise<void>;
}
