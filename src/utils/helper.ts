import { AxiosRequestConfig } from "axios";
import { ArgsProps } from "antd/lib/notification";

import { notify } from "./helper-notification";

export interface ProgressConfig {
  enabled?: boolean; // Default as true
}

export interface NotificationConfig {
  enabled?: boolean; // Default as false
  success?: {
    enabled: boolean;
    args?: ArgsProps;
  };
  error?: {
    enabled: boolean;
    args?: ArgsProps;
  };
}

export interface Config {
  requestConfig: AxiosRequestConfig;
  callback?: (resp: any) => void;
  progressConfig?: ProgressConfig;
  notificationConfig?: NotificationConfig;
}

export interface Configs {
  [apiKey: string]: Config;
}

export interface RuntimeConfig extends AxiosRequestConfig {};

// ====== Default Config Types ======

export interface DefaultProgressConfig {
  enabled: boolean; // Default as false
}

export interface DefaultNotificationConfig {
  enabled: boolean; // Default as false
  success: {
    enabled: boolean;
    args?: ArgsProps;
  };
  error: {
    enabled: boolean;
    args?: ArgsProps;
  };
}

export interface DefaultConfig {
  requestConfig: AxiosRequestConfig;
  callback: (resp: any) => void;
  progressConfig: DefaultProgressConfig;
  notificationConfig: DefaultNotificationConfig;
}

export interface DefaultConfigs {
  [apiKey: string]: DefaultConfig;
}

export function noop(...args: any[]) { console.log(...args); }

export const INITAL_NOTIFICATION_CONFIG: NotificationConfig = {
  enabled: false,
  success: {
    enabled: false,
  },
  error: {
    enabled: false,
  },
};

export const withDefault = (configs: Configs): DefaultConfigs => {
  const defaultConfigs: any = {};
  for (let [apiKey, config] of Object.entries(configs)) {
    const {
      requestConfig,
      callback = noop,
      progressConfig = {
        enabled: true,
      },
      notificationConfig = INITAL_NOTIFICATION_CONFIG,
    } = config;
    defaultConfigs[apiKey] = { requestConfig, callback, progressConfig, notificationConfig };
  }
  return defaultConfigs;
};

export const mergeParams = (staticConfig: DefaultConfig, runtimeConfig: RuntimeConfig) => {
  const merged = Object.assign({}, staticConfig, {
    requestConfig: Object.assign({}, staticConfig.requestConfig, runtimeConfig),
  });

  return merged;
};

export const notifyOnSuccess = (notificationConfig: NotificationConfig) => {
  const { enabled, success } = notificationConfig;
  if (!enabled) return;
  if (!(success && success.args)) return console.error("Success config is required when enabled is true.");
  notify({
    enabled: success.enabled,
    type: "success",
    config: success.args,
  });
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
