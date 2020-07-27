/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-27 20:57:51
 * @FilePath: /react-elm/src/page/home/store/reducer.jsx
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  restaurantCategoryListLoading: true,
  restaurantCategoryList: [],
  nearbyRestaurantListLoading: true,
  nearbyRestaurantList: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_RESTAURANT_CATEGORY_LIST: {
      return state.merge({
        restaurantCategoryList: fromJS(action.data),
        restaurantCategoryListLoading: false,
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
