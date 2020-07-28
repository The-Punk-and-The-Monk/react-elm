/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-07-28 21:55:54
 * @FilePath: /react-elm/src/page/food-category/store/actionCreators.jsx
 * @Description:
 */

import * as constants from "./constants";
import { _errTips } from "utils";
import RestaurantService from "services/restaurant-service";

const _restaurantService = new RestaurantService();

export const setRestaurantList = (data) => ({
  type: constants.CHANGE_DISPLAY_RESTAURANT_LIST,
  data: data,
});

// 获取餐馆列表
export const getRestaurantList = (params) => {
  return (dispatch) => {
    _restaurantService.getRestaurantList(params).then(
      (res) => {
        dispatch(setRestaurantList(res.data));
      },
      (err) => {
        _errTips(err.message);
      }
    );
  };
};
// return a function
