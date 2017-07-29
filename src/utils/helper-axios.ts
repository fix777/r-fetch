import axios from "axios";
import promisify from "es6-promisify";

import nProgress from "nprogress";
import "nprogress/nprogress.css";

import { DefaultConfig, tryCatch } from "./helper";
import { notify } from "./helper-notification";

export const axiosAsync = async (config: DefaultConfig) => {
  const { requestConfig, progressConfig, notificationConfig } = config;
  const { enabled: enableProgress } = progressConfig;
  const { enabled: enableNotify, error } = notificationConfig;

  if (enableProgress) nProgress.start();

  const axiosify = promisify(axios);
  const { type, arg } = await tryCatch(axiosify, null, requestConfig);

  if (enableProgress) nProgress.done();

  if (type == "throw") {
    console.error(arg);
    if (!enableNotify) return;
    notify({
      enabled: error.enabled,
      type: "error",
      config: {
        message: error.args && error.args.message || "Error",
        description: error.args && error.args.description || arg.toString(),
      }
    });
    return;
  }

  return arg;
};

export default axios;
