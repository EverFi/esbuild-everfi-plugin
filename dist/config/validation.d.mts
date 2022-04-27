import { Yaml, YamlSkeleton } from './yaml.mjs';
export declare class ConfigFile {
    readonly config: YamlSkeleton;
    constructor(config: YamlSkeleton);
    ensureValid(): true | never;
    toYaml(): Yaml;
}
