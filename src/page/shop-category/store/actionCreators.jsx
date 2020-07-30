/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-07-28 21:55:54
 * @FilePath: /react-elm/src/page/shop-category/store/actionCreators.jsx
 * @Description:
 */

import * as constants from "./constants";
import { _errTips } from "utils";
import ShopService from "services/shop-service";

const _shopService = new ShopService();

export const setShopList = (data) => ({
  type: constants.CHANGE_DISPLAY_RESTAURANT_LIST,
  data: data,
});

// 获取餐馆列表
export const getShopList = (params) => {
  return (dispatch) => {
    _shopService.getShopList(params).then(
      (res) => {
        dispatch(setShopList(res.data));
      },
      (err) => {
        _errTips(err.message);
      }
    );
  };
};
// return a function
