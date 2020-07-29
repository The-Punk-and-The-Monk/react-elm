/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-25 17:59:38
 * @FilePath: /react-elm/src/components/footer/store/reducer.js
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  selectedTab: "homeTab",
  hidden: false,
  fullscreen: false,
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_SELECTEDTAB: {
      return state.set("selectedTab", action.data);
    }

    default:
      return state;
  }
};
