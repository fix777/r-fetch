import axios, { AxiosResponse } from "axios";

import nProgress from "nprogress";
import "nprogress/nprogress.css";

import {
  Config,
  NotifyBtn,
  NotificationConfig,
  tryCatch,
} from "./helper";
import { notify } from "./helper-notification";

import DescriptionWrapper from "./notify/description-wrapper";
import ConfirmBtn from "./notify/confirm-btn";

export type AxiosPromise = Promise<AxiosResponse>;

interface Exception {
  response?: AxiosResponse;
  [x: string]: any;
}

const handleErrorNotifyBtn = (showBtn: boolean | NotifyBtn, key: string, config: any) => {
  if (
    !showBtn
    || (typeof showBtn != "boolean" && !["both", "error"].includes(showBtn.show))
  ) return config;
  let text;
  if (typeof showBtn == "object") text = showBtn.errorText;
  const btn = (<ConfirmBtn text={text} notifyKey={key} />);
  return Object.assign({}, config, { btn });
};

const handleThrow = (exception: Exception = {}, notificationConfig: NotificationConfig) => {
  const { showBtn = false, onPreError } = notificationConfig;
  if (typeof onPreError != "function") return;
  const { response } = exception;
  const { description, ...rest } = onPreError(response);
  const key = `error_$$_${Date.now()}`;
  const config = {
    description: (<DescriptionWrapper>{ description }</DescriptionWrapper>),
    duration: 0,
    key,
    ...rest
  };
  if (showBtn) {}
  notify({
    enabled: true,
    type: "error",
    config: handleErrorNotifyBtn(showBtn, key, config),
  });
}

export const axiosAsync = async (config: Config): Promise<any> => {
  const { requestConfig, progressConfig = {}, notificationConfig = {} } = config;
  const { enabled: enableProgress = true } = progressConfig;

  if (enableProgress) nProgress.start();
  const { type, arg } = await tryCatch(axios, null, requestConfig);
  if (enableProgress) nProgress.done();

  if (type == "throw") {
    handleThrow(arg, notificationConfig);
  }

  return new Promise((resolve, reject) => {
    if (type == "throw") reject(arg);
    else if (type == "normal") resolve(arg);
  });
};

export default axios;
