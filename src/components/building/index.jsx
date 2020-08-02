/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-08-02 12:33:36
 * @LastEditTime: 2020-08-02 18:18:30
 * @FilePath: /react-elm/src/components/building/index.jsx
 * @Description: 建设中页面
 */

import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";

const Building = () => {
  const history = useHistory();
  return (
    <div className="building-wrapper">
      <p>建设中~~~</p>
      <a href="#" onClick={() => history.go(-1)}>
        点我返回
      </a>
    </div>
  );
};

export default Building;
