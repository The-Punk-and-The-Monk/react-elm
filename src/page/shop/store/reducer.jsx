/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-08-02 19:23:42
 * @FilePath: /react-elm/src/page/shop/store/reducer.jsx
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

/**
 * shopingCart: {
 *  shopID: {
 *    foodId: {
 *      shopID,
 *      foodId,
 *      foodCategoryId,
 *      itemId,
 *      name,
 *      num,
 *      packing_fee,
 *      price,
 *      sku_id,
 *      specs,
 *      stock,
 *    }
 *    itemId: {
 *      num
 *    },
 *    foodCategoryId:{
 *      num
 *    }
 *  }
 * }
 */

const defaultState = fromJS({
  shop: {}, // 商家详情
  menu: [], // 商家菜单
  shoppingCart: {},
  ratingScores: {},
  ratingTags: [],
  ratingList: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_SHOP: {
      return state.set("shop", fromJS(action.data));
    }

    // menu 相关
    case constants.CHANGE_MENU: {
      return state.set("menu", fromJS(action.data));
    }
    case constants.ADD_FOOD_TO_CART: {
      const data = action.data;

      const foodId = data.foodId;
      const shopID = data.shopID;
      const itemId = data.itemId;
      const foodCategoryId = data.foodCategoryId;

      let shoppingCart = state.get("shoppingCart").toJS();
      if (!shoppingCart[shopID]) {
        shoppingCart[shopID] = {};
      }
      if (!shoppingCart[shopID][foodId]) {
        shoppingCart[shopID][foodId] = data;
      } else {
        shoppingCart[shopID][foodId].num += data.num;
      }
      if (!shoppingCart[shopID][itemId]) {
        shoppingCart[shopID][itemId] = {
          num: data.num,
        };
      } else {
        shoppingCart[shopID][itemId].num += data.num;
      }
      if (!shoppingCart[shopID][foodCategoryId]) {
        shoppingCart[shopID][foodCategoryId] = {
          num: data.num,
        };
      } else {
        shoppingCart[shopID][foodCategoryId].num += data.num;
      }

      return state.set("shoppingCart", fromJS(shoppingCart));
    }
    case constants.DECREASE_FOOD_FROM_CART: {
      const data = action.data;
      const foodId = data.foodId;
      const shopID = data.shopID;
      const itemId = data.itemId;
      const foodCategoryId = data.foodCategoryId;

      let shoppingCart = state.get("shoppingCart").toJS();
      if (!shoppingCart[shopID]) {
        console.log("shopID not exist");
      }
      if (!shoppingCart[shopID][foodId]) {
        console.log("foodid not exist");
      }
      if (!shoppingCart[shopID][itemId]) {
        console.log("itemid not exist");
      }
      if (!shoppingCart[shopID][foodCategoryId]) {
        console.log("foodCategoryId not exist");
      }
      shoppingCart[shopID][foodId].num -= 1;
      if (shoppingCart[shopID][foodId].num === 0) {
        delete shoppingCart[shopID][foodId];
      }
      shoppingCart[shopID][itemId].num -= 1;
      if (shoppingCart[shopID][itemId].num === 0) {
        delete shoppingCart[shopID][itemId];
      }
      shoppingCart[shopID][foodCategoryId].num -= 1;
      if (shoppingCart[shopID][foodCategoryId].num === 0) {
        delete shoppingCart[shopID][foodCategoryId];
      }
      if (Object.keys(shoppingCart[shopID]).length === 0) {
        delete shoppingCart[shopID];
      }
      return state.set("shoppingCart", fromJS(shoppingCart));
    }
    case constants.EMPTY_SHOP_CART: {
      return state.deleteIn(["shoppingCart", "" + action.shopID]);
    }

    // rating相关
    case constants.CHANGE_RATING_SCORES: {
      return state.set("ratingScores", fromJS(action.data));
    }
    case constants.CHANGE_RATING_TAGS: {
      return state.set("ratingTags", fromJS(action.data));
    }
    case constants.CHANGE_RATING_LIST: {
      return state.set("ratingList", fromJS(action.data));
    }
    case constants.CONCAT_RATINGS: {
      return state.set(
        "ratingList",
        state.get("ratingList").concat(fromJS(action.data))
      );
    }
    case constants.RESET: {
      return defaultState;
    }
    default:
      return state;
  }
};
