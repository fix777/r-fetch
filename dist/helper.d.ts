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
export interface RuntimeConfig extends AxiosRequestConfig {
}
export interface Configs {
    [apiKey: string]: Config;
}
export declare const mergeParams: (staticConfig: Config, runtimeConfig: RuntimeConfig) => Config & {
    requestConfig: AxiosRequestConfig & RuntimeConfig;
};
export declare const notifyOnSuccess: (notificationConfig: NotificationConfig) => void;
