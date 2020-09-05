/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-09-05 15:09:53
 * @FilePath: /react-elm/src/page/shop-category/store/actionCreators.jsx
 * @Description:
 */

import * as constants from "./constants";
import { _errTips } from "utils";
import ShopService from "services/shop-service";

const _shopService = new ShopService();

export const setShopList = (data) => ({
  type: constants.CHANGE_DISPLAY_SHOP_LIST,
  data: data,
});

export const concatShopList = (data) => ({
  type: constants.CONCAT_SHOP_LIST,
  data: data,
});

// 获取餐馆列表
export const getShopList = (function () {
  let fetching = false;
  return (params) => {
    return (dispatch) => {
      if (fetching) return;
      fetching = true;
      _shopService
        .getShopList(params)
        .then(
          (res) => {
            if (params.offset) {
              dispatch(concatShopList(res.data));
            } else {
              dispatch(setShopList(res.data));
            }
          },
          (err) => {
            _errTips(err.message);
          }
        )
        .then(() => {
          fetching = false;
        });
    };
  };
})();

// return a function
