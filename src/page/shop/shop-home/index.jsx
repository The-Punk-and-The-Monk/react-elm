import React, { PureComponent, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Menu } from "antd";

import { actionCreators as shopActionCreators } from "../store";

import ShopHomeHeader from "./components/shop-home-header";
import ShopMenu from "./components/shop-menu";
import ShopRating from "./components/shop-rating";

import "./style.scss";

class ShopHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }
  componentDidMount() {
    console.log("shophome mount");
    const { id } = this.props.match.params;
    const { getShopDetails } = this.props;
    getShopDetails(id);
  }

  handleMenuClick = ({ key }) => {
    // const { history } = this.props;
    // const { id } = this.props.match.params;
    // history.replace(`/shop/${id}/${key}`);
    console.log(key);
    if (key === "menu" && !this.state.showMenu) {
      this.setState({
        showMenu: true,
      });
    } else if (key === "rating" && this.state.showMenu) {
      this.setState({
        showMenu: false,
      });
    }
  };
  render() {
    const { showMenu } = this.state;
    const { id, page } = this.props.match.params;
    const { shop, menu } = this.props;
    const shopLoading = shop.size === 0;
    return (
      <div className="shop-home-wrapper">
        <ShopHomeHeader shop={shop} />
        <Menu
          defaultSelectedKeys={[showMenu ? "menu" : "rating"]}
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
        <div style={{ display: showMenu ? "block" : "none" }}>
          <ShopMenu shopID={id} />
        </div>
        <div style={{ display: !showMenu ? "block" : "none" }}>
          <ShopRating shopID={id} />
        </div>
        {/* <Switch>
          <Route path="/shop/:id/menu" component={ShopMenu} />
          <Route path="/shop/:id/rating" component={ShopRating} />
        </Switch> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  shop: state.getIn(["shop", "shop"]),
  menu: state.getIn(["shop", "menu"]),
});

const mapDispatchToProps = (dispatch) => ({
  getShopDetails(shopID) {
    return dispatch(shopActionCreators.getShopDetails(shopID));
  },
  getShopMenu(shopID) {
    return dispatch(shopActionCreators.getShopMenu(shopID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopHome);
