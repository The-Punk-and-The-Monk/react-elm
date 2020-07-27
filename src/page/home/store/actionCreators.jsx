/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-07-27 11:46:59
 * @FilePath: /react-elm/src/page/home/store/actionCreators.jsx
 * @Description:
 */

import * as constants from "./constants";
import RestaurantService from "services/restaurant-service.jsx";
import { _errTips } from "utils/index.jsx";

const _restaurant = new RestaurantService();

export const getRestaurantCategoryList = () => {
  return (dispatch) => {
    _restaurant.getRestaurantCategoryList().then(
      (res) => {
        dispatch({
          type: constants.CHANGE_RESTAURANT_CATEGORY_LIST,
          data: res.data,
        });
      },
      (err) => {
        _errTips(err.message);
      }
    );
  };
};

export const getNearbyRestaurantList = ({ latitude, longitude }) => {
  return (dispatch) => {
    _restaurant.getNearbyRestaurantList({ latitude, longitude }).then(
      (res) => {
        dispatch({
          type: constants.CHANGE_NEARBY_RESTAURANT_LIST,
          data: res.data,
        });
      },
      (err) => {
        _errTips(err.message);
      }
    );
  };
};
