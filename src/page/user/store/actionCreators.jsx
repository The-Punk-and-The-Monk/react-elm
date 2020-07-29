/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-07-29 17:13:16
 * @FilePath: /react-elm/src/page/user/store/actionCreators.jsx
 * @Description:
 */

import * as constants from "./constants";
import { _errTips } from "utils";

import UserService from "src/services/user-service.jsx";

const _user = new UserService();

export const login = (params) => {
  return (dispatch) => {
    return _user.login(params).then((res) => {
      let data = res.data;
      if (data.status === 0) {
        throw new Error(data);
      } else {
        dispatch({
          type: constants.CHANGE_USER,
          data: data,
        });
        return "login-success";
      }
    });
  };
};

export const changeUser = () => {};
