import { Result } from 'meow';
export declare type CliFlags = {
    clean: {
        type: 'boolean';
        default: true;
    };
};
export declare type CliResult = Result<CliFlags>;
export declare abstract class Cli {
    protected cli: CliResult;
    protected constructor(cli: CliResult);
    abstract init(): Promise<void>;
}
