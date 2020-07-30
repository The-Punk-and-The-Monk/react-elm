/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-07-30 23:32:28
 * @FilePath: /react-elm/src/page/shop/store/actionCreators.jsx
 * @Description:
 */

import * as constants from "./constants";
import { _errTips } from "utils";
import ShopService from "src/services/shop-service";

const _shop = new ShopService();

export const getShopDetails = (shopid) => {
  return (dispatch) => {
    if (shopid === -1) {
      // 用于置空shop
      dispatch({
        type: constants.CHANGE_SHOP,
        data: {},
      });
    } else {
      return _shop.getShopDetails(shopid).then((res) => {
        dispatch({
          type: constants.CHANGE_SHOP,
          data: res.data,
        });
      });
    }
  };
};

export const getShopMenu = (shopid) => {
  return (dispatch) => {
    if (shopid === -1) {
      // 用于置空menu
      dispatch({
        type: constants.CHANGE_MENU,
        data: [],
      });
    } else {
      return _shop.getShopMenu(shopid).then((res) => {
        dispatch({
          type: constants.CHANGE_MENU,
          data: res.data,
        });
      });
    }
  };
};

export const addFoodToCart = (obj) => ({
  type: constants.ADD_FOOD_TO_CART,
  data: obj,
});

export const decreaseFoodFromCart = (obj) => ({
  type: constants.DECREASE_FOOD_FROM_CART,
  data: obj,
});

export const emptyShopCart = (shopId) => ({
  type: constants.EMPTY_SHOP_CART,
  shopId,
});
