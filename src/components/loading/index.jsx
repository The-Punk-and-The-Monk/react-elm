/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-27 19:43:47
 * @LastEditTime: 2020-08-02 18:19:47
 * @FilePath: /react-elm/src/components/loading/index.jsx
 * @Description: 加载中页面
 */

import React from "react";
import { Spin } from "antd";
import "./style.scss";
export default function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="spin-wrapper">
        <Spin />
      </div>
    </div>
  );
}
