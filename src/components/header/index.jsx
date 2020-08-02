/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-28 11:39:47
 * @LastEditTime: 2020-08-02 18:19:30
 * @FilePath: /react-elm/src/components/header/index.jsx
 * @Description: 页面头部
 */

import React, { Fragment } from "react";
import { NavBar } from "antd-mobile";
import "./style.scss";

const Header = (props) => {
  const { leftContent = "", midContent = "", rightContent = "" } = props;
  return (
    <div className="header-wrapper">
      <NavBar mode="dark" leftContent={leftContent} rightContent={rightContent}>
        {midContent}
      </NavBar>
    </div>
  );
};

export default Header;
