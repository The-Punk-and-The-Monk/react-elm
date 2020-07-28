/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-07-28 21:41:07
 * @FilePath: /react-elm/src/page/food-category/components/options-cascader/store/actionCreators.jsx
 * @Description:
 */

import * as constants from "./constants";
import { _errTips } from "utils";
import RestaurantService from "services/restaurant-service";

const _restaurantService = new RestaurantService();

// 获取所有餐馆分类列表
export const getAllRestaurantCategoriesList = () => {
  return (dispatch) => {
    _restaurantService.getAllRestaurantCategoriesList().then(
      (res) => {
        dispatch({
          type: constants.CHANGE_ALL_RESTAURANT_CATEGORY_LIST,
          data: res.data,
        });
      },
      (err) => {
        _errTips(err.message);
      }
    );
  };
};
