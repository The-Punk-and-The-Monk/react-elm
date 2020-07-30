/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-28 19:20:35
 * @FilePath: /react-elm/src/page/shop-category/components/options-cascader/store/reducer.jsx
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  allShopCategoryListLoading: true,
  allShopCategoryList: [], // 所有餐馆分类列表
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_ALL_RESTAURANT_CATEGORY_LIST: {
      if (action.data.length === 0) {
        // 数据为空, 设置loading为true
        return state.merge({
          allShopCategoryListLoading: true,
          allShopCategoryList: fromJS(action.data),
        });
      } else {
        return state.merge({
          allShopCategoryListLoading: false,
          allShopCategoryList: fromJS(action.data),
        });
      }
    }

    default:
      return state;
  }
};
