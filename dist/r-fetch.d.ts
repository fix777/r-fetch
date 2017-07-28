import { Configs, RuntimeConfig } from "./helper";
export declare type RFetchConfigs = Configs;
export declare class RFetch {
    private configs;
    constructor(configs: Configs);
    request: (apiKey: string, runtimeConfig?: RuntimeConfig) => Promise<void>;
}
export default RFetch;
