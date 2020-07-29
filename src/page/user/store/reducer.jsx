/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-29 21:16:36
 * @FilePath: /react-elm/src/page/user/store/reducer.jsx
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  user: {},
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_USER: {
      return state.set("user", fromJS(action.data));
    }
    default:
      return state;
  }
};
