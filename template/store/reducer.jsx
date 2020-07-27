/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:15:06
 * @LastEditTime: 2020-07-27 10:08:52
 * @FilePath: /react-elm/template/store/reducer.jsx
 * @Description: 
 */ 
import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
});

export default (state = defaultState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};