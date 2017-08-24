import { AxiosResponse, AxiosRequestConfig } from "axios";
import { ArgsProps } from "antd/lib/notification";
export interface ProgressConfig {
    enabled?: boolean;
}
export declare type OnPre = (resp?: AxiosResponse) => ArgsProps;
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
export interface RuntimeConfig extends AxiosRequestConfig {
}
export declare const mergeParams: (staticConfig: Config, runtimeConfig: RuntimeConfig) => Config & {
    requestConfig: AxiosRequestConfig & RuntimeConfig;
};
export declare function tryCatch(fn: any, obj: any, arg: any): Promise<{
    type: string;
    arg: any;
}>;
