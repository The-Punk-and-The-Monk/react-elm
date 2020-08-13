import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { actionCreators } from "./store";

import ShopHome from "./shop-home";

import "./style.scss";
import {} from "./style";

class Shop extends PureComponent {
  componentWillUnmount() {
    const { reset } = this.props;
    console.log("shop unmount");
    // 离开shop相关页面,清空shopdetails, shopmenu等
    reset();
  }

  render() {
    return (
      <Switch>
        <Route path="/shop/:id/home" component={ShopHome} />
        <Redirect from="/shop/:id" to="/shop/:id/home" />
        <Redirect from="/shop" to="/home" />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getShopDetails(shopid) {
    return dispatch(actionCreators.getShopDetails(shopid));
  },
  getShopMenu(shopid) {
    return dispatch(actionCreators.getShopMenu(shopid));
  },
  reset() {
    dispatch(actionCreators.reset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
