/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-26 10:30:02
 * @FilePath: /react-elm/src/page/location/store/reducer.jsx
 * @Description:
 */

import { fromJS } from "immutable";
import * as constants from "./constants";

const defaultState = fromJS({
  city: {},
  hotCityList: [],
  allCityMap: {},
  addr: {},
  searchAddrList: [],
  searchAddrHistoryList: [],
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_CITY: {
      return state.set("city", fromJS(action.data));
    }
    case constants.CHANGE_HOT_CITIES_LIST: {
      return state.set("hotCityList", fromJS(action.data));
    }
    case constants.CHANGE_ALL_CITY_LIST: {
      return state.set("allCityMap", fromJS(action.data));
    }
    case constants.CHANGE_SEARCH_ADDR_LIST: {
      return state.set("searchAddrList", fromJS(action.data));
    }
    case constants.CHANGE_SEARCH_ADDR_HISTORY_LIST: {
      return state.set("searchAddrHistoryList", fromJS(action.data));
    }
    case constants.PUSH_SEARCH_ADDR_HISTORY: {
      return state.set(
        "searchAddrHistoryList",
        state.get("searchAddrHistoryList").push(fromJS(action.data))
      );
    }
    case constants.CHANGE_ADDR: {
      return state.set("addr", fromJS(action.data));
    }
    default:
      return state;
  }
};
