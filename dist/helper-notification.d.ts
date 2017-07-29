import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";
export declare type Types = "success" | "error" | "open";
export interface Notify {
    enabled?: boolean;
    type?: Types;
    config: ArgsProps;
}
export declare const notify: ({enabled, type, config}: Notify) => void;
export default notification;
