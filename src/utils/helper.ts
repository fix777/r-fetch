import { AxiosRequestConfig } from "axios";
import { ArgsProps } from "antd/lib/notification";

import { notify } from "./helper-notification";

export interface ProgressConfig {
  enabled?: boolean; // Default as true
}

export interface NotificationConfig {
  enabled?: boolean; // Default as true
  success?: ArgsProps;
  error?: ArgsProps;
}

export const INITAL_NOTIFICATION_CONFIG: NotificationConfig = {
  enabled: false,
  success: {
    message: "",
    description: "",
  },
  error: {
    message: "",
    description: "",
  },
};

export interface Config {
  requestConfig: AxiosRequestConfig;
  callback?: (resp: any) => void;
  progressConfig?: ProgressConfig;
  notificationConfig?: NotificationConfig;
}

export interface RuntimeConfig extends AxiosRequestConfig {};

export interface Configs {
  [apiKey: string]: Config;
}

export const mergeParams = (staticConfig: Config, runtimeConfig: RuntimeConfig) => {
  const merged = Object.assign({}, staticConfig, {
    requestConfig: Object.assign({}, staticConfig.requestConfig, runtimeConfig),
  });

  return merged;
};

export const notifyOnSuccess = (notificationConfig: NotificationConfig) => {
  const { enabled, success } = notificationConfig;
  if (!enabled) return;
  if (!success) return console.error("Success config is required when enabled is true.");
  notify({
    type: "success",
    config: success,
  });
};
