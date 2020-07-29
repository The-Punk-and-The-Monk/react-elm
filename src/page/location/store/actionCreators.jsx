import * as constants from "./constants";
import locationService from "src/services/location-service";
import { _errTips } from "src/utils";
import { fromJS } from "immutable";

const _loc = new locationService();

export const changeCity = (city) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: constants.CHANGE_CITY,
        data: city,
      });
      resolve();
    });
  };
};
// return a function
export const guessCity = () => {
  return (dispatch) => {
    _loc.guessCity().then(
      (res) => {
        dispatch({
          type: constants.CHANGE_CITY,
          data: res.data,
        });
      },
      (err) => {
        _errTips(err.message);
      }
    );
  };
};

export const getHotCities = () => {
  return (dispatch) => {
    _loc.getHotCities().then(
      (res) => {
        dispatch({
          type: constants.CHANGE_HOT_CITIES_LIST,
          data: res.data,
        });
      },
      (err) => {
        _errTips(err.message);
      }
    );
  };
};

export const getAllCity = () => (dispatch) => {
  _loc.getAllCity().then(
    (res) => {
      dispatch({
        type: constants.CHANGE_ALL_CITY_LIST,
        data: res.data,
      });
    },
    (err) => {
      _errTips(err.message);
    }
  );
};

export const searchAddr = (cityId, keyword) => {
  return (dispatch) => {
    _loc.searchAddr(cityId, keyword).then(
      (res) => {
        dispatch({
          type: constants.CHANGE_SEARCH_ADDR_LIST,
          data: res.data,
        });
      },
      (err) => _errTips(err.message)
    );
  };
};

export const clearSearchAddrList = () => ({
  type: constants.CHANGE_SEARCH_ADDR_LIST,
  data: [],
});

export const getSearchAddrHistory = () => {
  return (dispatch) => {
    let searchAddrHistory = fromJS(
      JSON.parse(localStorage.getItem("searchAddrHistory"))
    );
    if (!searchAddrHistory) {
      searchAddrHistory = [];
      localStorage.setItem(
        "searchAddrHistory",
        JSON.stringify(searchAddrHistory)
      );
    }
    dispatch({
      type: constants.CHANGE_SEARCH_ADDR_HISTORY_LIST,
      data: searchAddrHistory,
    });
  };
};

export const pushSearchAddrHistory = (addr) => {
  return (dispatch, getState) => {
    const searchAddrHistory = getState().getIn([
      "location",
      "searchAddrHistoryList",
    ]);

    return new Promise((resolve, reject) => {
      dispatch(changeAddr(addr));
      for (let existingAddr of searchAddrHistory) {
        if (existingAddr.includes(addr.geohash)) {
          resolve();
          return;
        }
      }
      dispatch({
        type: constants.PUSH_SEARCH_ADDR_HISTORY,
        data: addr,
      });
      localStorage.setItem(
        "searchAddrHistory",
        JSON.stringify(searchAddrHistory.push(addr).toJS())
      );
      resolve();
    });
  };
};

export const changeAddr = (addr) => {
  return (dispatch) => {
    localStorage.setItem("addr", JSON.stringify(addr));
    dispatch({
      type: constants.CHANGE_ADDR,
      data: addr,
    });
  };
};

export const getAddr = () => {
  return (dispatch, getState) => {
    const addr = JSON.parse(localStorage.getItem("addr"));
    if (addr) {
      dispatch({
        type: constants.CHANGE_ADDR,
        data: addr,
      });
    }
  };
};
