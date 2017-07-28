import { AxiosRequestConfig } from "axios";
import { ArgsProps } from "antd/lib/notification";
export interface ProgressConfig {
    enabled?: boolean;
}
export interface NotificationConfig {
    enabled?: boolean;
    success?: ArgsProps;
    error?: ArgsProps;
}
export declare const INITAL_NOTIFICATION_CONFIG: NotificationConfig;
export interface Config {
    requestConfig: AxiosRequestConfig;
    callback?: (resp: any) => void;
    progressConfig?: ProgressConfig;
    notificationConfig?: NotificationConfig;
}
export declare type RuntimeConfig = AxiosRequestConfig;
export interface Configs {
    [apiKey: string]: Config;
}
export declare const mergeParams: (staticConfig: Config, runtimeConfig: AxiosRequestConfig) => Config & {
    requestConfig: AxiosRequestConfig;
};
export declare const notifyOnSuccess: (notificationConfig: NotificationConfig) => void;
