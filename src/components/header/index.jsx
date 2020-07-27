import React, { Fragment } from "react";
import { NavBar } from "antd-mobile";
import "./style.scss";

const Header = (props) => {
  const { leftContent = "", midContent = "", rightContent = "" } = props;
  return (
    <Fragment>
      <div className="header-wrapper">
        <NavBar
          mode="dark"
          leftContent={leftContent}
          rightContent={rightContent}
        >
          {midContent}
        </NavBar>
      </div>
      <div className="header-children-wrapper">{props.children}</div>
    </Fragment>
  );
};

export default Header;
