/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-07-27 11:46:59
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
          type: constants.CHANGE_HOME_RESTAURANT_CATEGORY_LIST,
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
export const getNearbyShopList = ({ latitude, longitude }) => {
  return (dispatch) => {
    _shop.getShopList({ latitude, longitude }).then(
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
