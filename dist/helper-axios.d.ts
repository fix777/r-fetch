import axios from "axios";
import "nprogress/nprogress.css";
import { Config } from "./helper";
export declare const axiosAsync: (config: Config) => Promise<any>;
export default axios;
