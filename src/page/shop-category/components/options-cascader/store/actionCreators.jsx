/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-07-28 21:41:07
 * @FilePath: /react-elm/src/page/shop-category/components/options-cascader/store/actionCreators.jsx
 * @Description:
 */

import * as constants from "./constants";
import { _errTips } from "utils";
import ShopService from "services/shop-service";

const _shopService = new ShopService();

// 获取所有餐馆分类列表
export const getAllShopCategoriesList = () => {
  return (dispatch) => {
    _shopService.getAllShopCategoriesList().then(
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
