import {
  axiosAsync,
} from "./helper-axios";
import {
  OnPre,
  Configs,
  RuntimeConfig,
  mergeParams,
} from "./helper";
import "./index.css";

export type OnPreError = OnPre;
export type OnPreSuccess = OnPre;

export type RFetchConfigs = Configs;

export class RFetch {
  private configs: RFetchConfigs;

  constructor(configs: Configs) {
    this.configs = configs;
  }

  public request = (apiKey: string, runtimeConfig: RuntimeConfig = {}): Promise<any> => {
    if (!this.configs) throw new Error("Configs is required.");
    if (!this.configs[apiKey]) throw new Error(`ApiKey: ${apiKey} not found.`);
    const staticConfig = this.configs[apiKey];
    return axiosAsync(mergeParams(staticConfig, runtimeConfig));
  }
}

export default RFetch;
