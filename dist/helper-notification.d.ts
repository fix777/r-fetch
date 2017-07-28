import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";
export declare type Types = "success" | "error" | "open";
export interface Notify {
    type?: Types;
    config: ArgsProps;
}
export declare const notify: ({type, config}: Notify) => void;
export default notification;
