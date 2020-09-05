/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-09-05 14:56:00
 * @FilePath: /react-elm/src/page/home/store/actionCreators.jsx
 * @Description:
 */

import * as constants from "./constants";
import ShopService from "services/shop-service.jsx";
import { _errTips } from "utils/index.jsx";

const _shop = new ShopService();

// 获取首页的餐馆分类列表
export const getHomeShopCategoryList = () => {
  return (dispatch) => {
    _shop.getHomeShopCategoryList().then(
      (res) => {
        dispatch({
          type: constants.CHANGE_HOME_SHOP_CATEGORY_LIST,
          data: res.data,
        });
      },
      (err) => {
        _errTips(err.message);
      }
    );
  };
};

// 获取附近的餐馆列表
export const getNearbyShopList = (function () {
  let fetching = false;
  return (params) => {
    return (dispatch) => {
      if (fetching) return;
      fetching = true;
      _shop
        .getShopList(params)
        .then(
          (res) => {
            if (params.offset) {
              dispatch({
                type: constants.CONCAT_NEARBY_SHOP_LIST,
                data: res.data,
              });
            } else {
              dispatch({
                type: constants.CHANGE_NEARBY_SHOP_LIST,
                data: res.data,
              });
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
