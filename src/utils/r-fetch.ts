import { axiosAsync } from "./helper-axios";
import { Configs, RuntimeConfig, mergeParams, notifyOnSuccess } from "./helper";

export type RFetchConfigs = Configs;

export class RFetch {
  private configs: Configs;

  constructor(configs: Configs) {
    this.configs = configs;
  }

  public request = async (apiKey: string, runtimeConfig: RuntimeConfig = {}) => {
    if (!this.configs) return console.error("Configs is required."); // tslint:disable-line:no-console
    console.log(this.configs[apiKey]);
    const staticConfig = this.configs[apiKey];
    const r = await axiosAsync(mergeParams(staticConfig, runtimeConfig));
    const { callback, notificationConfig = {}, } = staticConfig;
    if (typeof callback != "function" || !r) return;
    callback(r.data);
    notifyOnSuccess(notificationConfig);
  }
}

export default RFetch;
