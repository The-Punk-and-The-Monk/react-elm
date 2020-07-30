/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 19:22:53
 * @LastEditTime: 2020-07-30 11:57:13
 * @FilePath: /react-elm/src/store/reducer.jsx
 * @Description: combine all store
 */

// import { reducer as headerReducer } from '../common/header/store';
// import { reducer as homeReducer } from '../pages/home/store';

import { combineReducers } from "redux-immutable";
import { reducer as locationReducer } from "../page/location/store";
import { reducer as homeReducer } from "src/page/home/store";
import { reducer as userReducer } from "src/page/user/store";
import { reducer as shopCategoryReducer } from "src/page/shop-category/store";
import { reducer as optionsCascaderReducer } from "src/page/shop-category/components/options-cascader/store";
import { reducer as shopReducer } from "src/page/shop/store";

export default combineReducers({
  location: locationReducer,
  home: homeReducer,
  user: userReducer,
  shop: shopReducer,
  shopCategory: shopCategoryReducer,
  optionsCascader: optionsCascaderReducer,
});
