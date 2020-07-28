/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-28 18:12:05
 * @FilePath: /react-elm/src/page/home/store/reducer.jsx
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  homeRestaurantCategoryListLoading: true,
  homeRestaurantCategoryList: [], // 首页头部餐馆分类列表
  nearbyRestaurantListLoading: true,
  nearbyRestaurantList: [], // 附近餐馆列表
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_HOME_RESTAURANT_CATEGORY_LIST: {
      return state.merge({
        homeRestaurantCategoryList: fromJS(action.data),
        homeRestaurantCategoryListLoading: false,
      });
    }
    case constants.CHANGE_NEARBY_RESTAURANT_LIST: {
      return state.merge({
        nearbyRestaurantList: fromJS(action.data),
        nearbyRestaurantListLoading: false,
      });
    }
    default:
      return state;
  }
};
