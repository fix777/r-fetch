import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";

export type Types = "success" | "error" | "open";

export interface Notify {
  type?: Types;
  config: ArgsProps;
}

export const notify = ({ type = "open", config }: Notify) => notification[type](config);

export default notification;
