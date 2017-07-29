import axios from "axios";
import "nprogress/nprogress.css";
import { DefaultConfig } from "./helper";
export declare const axiosAsync: (config: DefaultConfig) => Promise<any>;
export default axios;
