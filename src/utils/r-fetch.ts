import { axiosAsync } from "./helper-axios";
import { DefaultConfigs, Configs, RuntimeConfig, mergeParams, notifyOnSuccess, withDefault, noop, } from "./helper";

export type RFetchConfigs = Configs;

export class RFetch {
  private configs: DefaultConfigs;

  constructor(configs: Configs) {
    this.configs = withDefault(configs);
  }

  public request = async (apiKey: string, runtimeConfig: RuntimeConfig = {}, callbackAsync = noop) => {
    if (!this.configs) return console.error("Configs is required."); // tslint:disable-line:no-console
    // console.log(this.configs[apiKey]);
    const staticConfig = this.configs[apiKey];
    const { data } = await axiosAsync(mergeParams(staticConfig, runtimeConfig));
    const { callback, notificationConfig, } = staticConfig;
    callbackAsync(data);
    callback(data);
    notifyOnSuccess(notificationConfig);
  }
}

export default RFetch;
