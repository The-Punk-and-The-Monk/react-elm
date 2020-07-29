import React, { PureComponent, useEffect, Fragment } from "react";
import { useSelector, useDispatch, connect } from "react-redux";

import Header from "src/components/header";
import Footer from "src/components/footer";

import { actionCreators } from "./store";
import { actionCreators as footerActionCreators } from "src/components/footer/store";

import "./style.scss";
import {} from "./style";

class Search extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header />
        <div>hahaha</div>
        <Footer selectedTab="searchTab" />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
