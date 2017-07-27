import axios from "axios";
import promisify from "es6-promisify";

import nProgress from "nprogress";
import "nprogress/nprogress.css";

import { Config } from "./helper";

export const axiosAsync = async (config: Config) => {
  nProgress.start();
  try {
    const axiosify = promisify(axios);
    const rPromise = await axiosify(config.requestConfig);
    nProgress.done();
    return rPromise;
  } catch (e) {
    nProgress.done();
    console.error(e);
  }
};

export default axios;
