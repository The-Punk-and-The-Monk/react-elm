/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-25 09:14:39
 * @LastEditTime: 2020-07-25 18:05:12
 * @FilePath: /react-elm/src/components/footer/store/actionCreators.js
 * @Description: 
 */ 
import axios from 'axios';
import * as constants from './constants';


export const changeSelectedTab = (selectedTab) => {
  return {
    type: constants.CHANGE_SELECTEDTAB,
    data: selectedTab
  };
};
// return a function
// export const getHomeData = () => {
//   return (dispatch) => {
//     axios.get('/api/home.json').then((res) => {
//       const result = res.data.data
//       dispatch({
//         type: constants.CHANGE_HOME_DATA,
//         topicList: result.topicList,
//         articleList: result.articleList,
//         recommendList: result.recommendList
//       })
//     }).catch()
//   }
// }

// // return a object
// export const toggleShowTop = (bool) => ({
//   type: constants.TOGGLE_SHOW_TOP,
//   showTop: bool
// })
