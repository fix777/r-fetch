import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";

export type Types = "success" | "error" | "open";

export interface Notify {
  enabled?: boolean;
  type?: Types;
  config: ArgsProps;
}

export const notify = ({ enabled = false, type = "open", config }: Notify) => {
  if (!enabled) return;
  notification[type](config);
};

export default notification;
