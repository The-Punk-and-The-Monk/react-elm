/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 19:22:53
 * @LastEditTime: 2020-07-28 21:58:07
 * @FilePath: /react-elm/src/store/reducer.jsx
 * @Description: combine all store
 */

// import { reducer as headerReducer } from '../common/header/store';
// import { reducer as homeReducer } from '../pages/home/store';

import { combineReducers } from "redux-immutable";
import { reducer as footerReducer } from "../components/footer/store";
import { reducer as locationReducer } from "../page/location/store";
import { reducer as homeReducer } from "src/page/home/store";
import { reducer as foodCategoryReducer } from "src/page/food-category/store";
import { reducer as optionsCascaderReducer } from "src/page/food-category/components/options-cascader/store";

export default combineReducers({
  footer: footerReducer,
  location: locationReducer,
  home: homeReducer,
  foodCategory: foodCategoryReducer,
  optionsCascader: optionsCascaderReducer,
});
