import { OnPre, Configs, RuntimeConfig } from "./helper";
export declare type OnPreError = OnPre;
export declare type OnPreSuccess = OnPre;
export declare type RFetchConfigs = Configs;
export declare class RFetch {
    private configs;
    constructor(configs: Configs);
    request: (apiKey: string, runtimeConfig?: RuntimeConfig) => Promise<any>;
}
export default RFetch;
