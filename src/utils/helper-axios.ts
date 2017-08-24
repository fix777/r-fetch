import axios, { AxiosResponse } from "axios";

import nProgress from "nprogress";
import "nprogress/nprogress.css";

import {
  Config,
  OnPre,
  tryCatch,
} from "./helper";
import { notify } from "./helper-notification";

export type AxiosPromise = Promise<AxiosResponse>;

interface Exception {
  response?: AxiosResponse;
  [x: string]: any;
}

const handleThrow = (exception: Exception = {}, onPreError?: OnPre) => {
  if (typeof onPreError != "function") return;
  const { response } = exception;
  const config = onPreError(response);
  notify({
    enabled: true,
    type: "error",
    config,
  });
}

export const axiosAsync = async (config: Config): Promise<any> => {
  const { requestConfig, progressConfig = {}, notificationConfig = {} } = config;
  const { enabled: enableProgress } = progressConfig;
  const { onPreError } = notificationConfig;

  if (enableProgress) nProgress.start();
  const { type, arg } = await tryCatch(axios, null, requestConfig);
  if (enableProgress) nProgress.done();

  if (type == "throw") {
    handleThrow(arg, onPreError);
  }

  return new Promise((resolve, reject) => {
    if (type == "throw") reject(arg);
    else if (type == "normal") resolve(arg);
  });
};

export default axios;
