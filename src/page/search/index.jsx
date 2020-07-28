import React, { PureComponent, useEffect, Fragment } from "react";
import { useSelector, useDispatch, connect } from "react-redux";

import Header from "src/components/header";
import Footer from "src/components/footer";

import { actionCreators } from "./store";
import { actionCreators as footerActionCreators } from "src/components/footer/store";

import "./style.scss";
import {} from "./style";

class Search extends PureComponent {
  componentDidMount() {
    const { changeSelectedTab } = this.props;
    changeSelectedTab("searchTab");
  }
  render() {
    return (
      <Fragment>
        <Header />
        <div>hahaha</div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  changeSelectedTab(targetTab) {
    dispatch(footerActionCreators.changeSelectedTab(targetTab));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
