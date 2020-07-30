/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-31 01:00:18
 * @FilePath: /react-elm/src/page/shop/store/reducer.jsx
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

/**
 * shopingCart: {
 *  shopId: {
 *        foodId: {
 *          shopId,
 *          foodId,
 *          foodCategoryId,
 *          itemId,
 *          name,
 *          num,
 *          packing_fee,
 *          price,
 *          sku_id,
 *          specs,
 *          stock,
 *        }
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
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_SHOP: {
      return state.set("shop", fromJS(action.data));
    }
    case constants.CHANGE_MENU: {
      return state.set("menu", fromJS(action.data));
    }
    case constants.ADD_FOOD_TO_CART: {
      const data = action.data;

      const foodId = data.foodId;
      const shopId = data.shopId;
      const itemId = data.itemId;
      const foodCategoryId = data.foodCategoryId;

      let shoppingCart = state.get("shoppingCart").toJS();
      if (!shoppingCart[shopId]) {
        shoppingCart[shopId] = {};
      }
      if (!shoppingCart[shopId][foodId]) {
        shoppingCart[shopId][foodId] = data;
      } else {
        shoppingCart[shopId][foodId].num += data.num;
      }
      if (!shoppingCart[shopId][itemId]) {
        shoppingCart[shopId][itemId] = {
          num: data.num,
        };
      } else {
        shoppingCart[shopId][itemId].num += data.num;
      }
      if (!shoppingCart[shopId][foodCategoryId]) {
        shoppingCart[shopId][foodCategoryId] = {
          num: data.num,
        };
      } else {
        shoppingCart[shopId][foodCategoryId].num += data.num;
      }

      return state.set("shoppingCart", fromJS(shoppingCart));
    }
    case constants.DECREASE_FOOD_FROM_CART: {
      const data = action.data;
      const foodId = data.foodId;
      const shopId = data.shopId;
      const itemId = data.itemId;
      const foodCategoryId = data.foodCategoryId;

      let shoppingCart = state.get("shoppingCart").toJS();
      if (!shoppingCart[shopId]) {
        console.log("shopid not exist");
      }
      if (!shoppingCart[shopId][foodId]) {
        console.log("foodid not exist");
      }
      if (!shoppingCart[shopId][itemId]) {
        console.log("itemid not exist");
      }
      if (!shoppingCart[shopId][foodCategoryId]) {
        console.log("foodCategoryId not exist");
      }
      shoppingCart[shopId][foodId].num -= 1;
      if (shoppingCart[shopId][foodId].num === 0) {
        delete shoppingCart[shopId][foodId];
      }
      shoppingCart[shopId][itemId].num -= 1;
      if (shoppingCart[shopId][itemId].num === 0) {
        delete shoppingCart[shopId][itemId];
      }
      shoppingCart[shopId][foodCategoryId].num -= 1;
      if (shoppingCart[shopId][foodCategoryId].num === 0) {
        delete shoppingCart[shopId][foodCategoryId];
      }

      return state.set("shoppingCart", fromJS(shoppingCart));
    }
    case constants.EMPTY_SHOP_CART: {
      return state.deleteIn(["shoppingCart", "" + action.shopId]);
    }
    default:
      return state;
  }
};
