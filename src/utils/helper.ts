import { AxiosResponse, AxiosRequestConfig } from "axios";
import { ArgsProps } from "antd/lib/notification";

export interface ProgressConfig {
  enabled?: boolean; // Default as true
}

export type OnPre = (resp?: AxiosResponse) => ArgsProps;
export interface NotificationConfig {
  onPreSuccess?: OnPre;
  onPreError?: OnPre;
}

export interface Config {
  requestConfig: AxiosRequestConfig;
  progressConfig?: ProgressConfig;
  notificationConfig?: NotificationConfig;
}

export interface Configs {
  [apiKey: string]: Config;
}

export interface RuntimeConfig extends AxiosRequestConfig {};

export const mergeParams = (staticConfig: Config, runtimeConfig: RuntimeConfig) => {
  const merged = Object.assign({}, staticConfig, {
    requestConfig: Object.assign({}, staticConfig.requestConfig, runtimeConfig),
  });

  return merged;
};

// Try/catch helper to minimize deoptimizations. Returns a completion
// record like context.tryEntries[i].completion. This interface could
// have been (and was previously) designed to take a closure to be
// invoked without arguments, but in all the cases we care about we
// already have an existing method we want to call, so there's no need
// to create a new function object. We can even get away with assuming
// the method takes exactly one argument, since that happens to be true
// in every case, so we don't have to touch the arguments object. The
// only additional allocation required is the completion record, which
// has a stable shape and so hopefully should be cheap to allocate.
export async function tryCatch(fn, obj, arg) {
  try {
    return { type: "normal", arg: await fn.call(obj, arg) };
  } catch (err) {
    return { type: "throw", arg: err };
  }
}
