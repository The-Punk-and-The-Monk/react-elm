/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-28 21:53:49
 * @FilePath: /react-elm/src/page/food-category/store/reducer.jsx
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  dispalyRestaurantListLoading: true,
  dispalyRestaurantList: [], // 页面显示的餐馆列表
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_DISPLAY_RESTAURANT_LIST: {
      if (action.data.length === 0) {
        // 数据为空,置loading为true
        return state.merge({
          dispalyRestaurantListLoading: true,
          dispalyRestaurantList: [],
        });
      } else {
        return state.merge({
          dispalyRestaurantListLoading: false,
          dispalyRestaurantList: fromJS(action.data),
        });
      }
    }
    default:
      return state;
  }
};
