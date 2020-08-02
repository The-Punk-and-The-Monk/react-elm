/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-08-02 18:14:06
 * @FilePath: /react-elm/src/page/home/store/reducer.jsx
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  homeShopCategoryListLoading: true,
  homeShopCategoryList: [], // 首页头部餐馆分类列表
  nearbyShopListLoading: true,
  nearbyShopList: [], // 附近餐馆列表
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_HOME_SHOP_CATEGORY_LIST: {
      return state.merge({
        homeShopCategoryList: fromJS(action.data),
        homeShopCategoryListLoading: false,
      });
    }
    case constants.CHANGE_NEARBY_SHOP_LIST: {
      return state.merge({
        nearbyShopList: fromJS(action.data),
        nearbyShopListLoading: false,
      });
    }
    case constants.CONCAT_NEARBY_SHOP_LIST: {
      return state.set(
        "nearbyShopList",
        state.get("nearbyShopList").concat(fromJS(action.data))
      );
    }
    default:
      return state;
  }
};
