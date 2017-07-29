import { AxiosRequestConfig } from "axios";
import { ArgsProps } from "antd/lib/notification";
export interface ProgressConfig {
    enabled?: boolean;
}
export interface NotificationConfig {
    enabled?: boolean;
    success?: {
        enabled: boolean;
        args?: ArgsProps;
    };
    error?: {
        enabled: boolean;
        args?: ArgsProps;
    };
}
export interface Config {
    requestConfig: AxiosRequestConfig;
    callback?: (resp: any) => void;
    progressConfig?: ProgressConfig;
    notificationConfig?: NotificationConfig;
}
export interface Configs {
    [apiKey: string]: Config;
}
export interface RuntimeConfig extends AxiosRequestConfig {
}
export interface DefaultProgressConfig {
    enabled: boolean;
}
export interface DefaultNotificationConfig {
    enabled: boolean;
    success: {
        enabled: boolean;
        args?: ArgsProps;
    };
    error: {
        enabled: boolean;
        args?: ArgsProps;
    };
}
export interface DefaultConfig {
    requestConfig: AxiosRequestConfig;
    callback: (resp: any) => void;
    progressConfig: DefaultProgressConfig;
    notificationConfig: DefaultNotificationConfig;
}
export interface DefaultConfigs {
    [apiKey: string]: DefaultConfig;
}
export declare function noop(...args: any[]): void;
export declare const INITAL_NOTIFICATION_CONFIG: NotificationConfig;
export declare const withDefault: (configs: Configs) => DefaultConfigs;
export declare const mergeParams: (staticConfig: DefaultConfig, runtimeConfig: RuntimeConfig) => DefaultConfig & {
    requestConfig: AxiosRequestConfig & RuntimeConfig;
};
export declare const notifyOnSuccess: (notificationConfig: NotificationConfig) => void;
export declare function tryCatch(fn: any, obj: any, arg: any): Promise<{
    type: string;
    arg: any;
}>;
