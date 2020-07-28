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
  city: {}, // 城市
  hotCityList: [], // 热门城市列表
  allCityMap: {}, // 所有城市map, 字母A~Z 到以其开头的城市list
  addr: {}, // 最后的详细地址
  searchAddrList: [], // 搜索结果
  searchAddrHistoryList: [], // 用户选中的详细地址历史list
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
