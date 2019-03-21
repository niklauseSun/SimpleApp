import React from "react";
import { Toast } from 'teaset'


export default class ToastUtil {
  static message = text => {
    Toast.message(text);
  };
  static show = text => {
    Toast.show(text);
  };

  static fail = text => {
    Toast.fail(text);
  }
}