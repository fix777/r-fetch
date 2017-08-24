import axios, { AxiosResponse } from "axios";
import "nprogress/nprogress.css";
import { Config } from "./helper";
export declare type AxiosPromise = Promise<AxiosResponse>;
export declare const axiosAsync: (config: Config) => Promise<any>;
export default axios;
