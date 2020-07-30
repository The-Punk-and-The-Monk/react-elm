import React, { PureComponent, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators as shopActionCreators } from "../store";
import { Row, Col, Avatar, Skeleton } from "antd";
import ShopHomeHeader from "./components/shop-home-header";
import { Menu } from "antd";
import ShopMenu from "./components/shop-menu";
import ShopRating from "./components/shop-rating";
import "./style.scss";

class ShopHome extends PureComponent {
  componentDidMount() {
    console.log("shophome mount");
    const { id } = this.props.match.params;
    const { getShopDetails } = this.props;
    getShopDetails(id);
  }

  componentWillUnmount() {
    const { getShopDetails, getShopMenu } = this.props;

    // 离开shop相关页面,清空shopdetails, shopmenu等
    getShopDetails(-1);
    getShopMenu(-1);
  }

  handleMenuClick = ({ key }) => {
    const { history } = this.props;
    const { id } = this.props.match.params;
    history.push(`/shop/${id}/${key}`);
  };
  render() {
    const { id, page } = this.props.match.params;
    const { shop, menu } = this.props;
    const shopLoading = shop.size === 0;
    return (
      <div className="shop-home-wrapper">
        <ShopHomeHeader shop={shop} />
        <Menu
          defaultSelectedKeys={[page]}
          mode="horizontal"
          onClick={this.handleMenuClick}
          className="shop-nav"
        >
          <Menu.Item key="menu">
            <span>商品</span>
          </Menu.Item>
          <Menu.Item key="rating">
            <span>评价</span>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/shop/:id/menu" component={ShopMenu} />
          <Route path="/shop/:id/rating">
            <ShopRating rating={""} />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  shop: state.getIn(["shop", "shop"]),
  menu: state.getIn(["shop", "menu"]),
});

const mapDispatchToProps = (dispatch) => ({
  getShopDetails(shopid) {
    return dispatch(shopActionCreators.getShopDetails(shopid));
  },
  getShopMenu(shopid) {
    return dispatch(shopActionCreators.getShopMenu(shopid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopHome);
