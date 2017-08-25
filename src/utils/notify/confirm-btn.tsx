import React from "react";
import { Button, notification } from "antd";

const close = (key: string) => () => notification.close(key);

const ConfirmBtn = ({ notifyKey, text = "Got it" }: any) => (
  <Button
    size="small"
    type="primary"
    onClick={close(notifyKey)}
  >
    { text }
  </Button>
);

export default ConfirmBtn;
