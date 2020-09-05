/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-27 10:14:49
 * @LastEditTime: 2020-09-05 18:34:35
 * @FilePath: /react-elm/src/page/home/index.jsx
 * @Description:
 */

import React, { PureComponent, Fragment } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as locationActionCreators } from "src/page/location/store";
import Header from "src/components/header";
import Footer from "src/components/footer";
import ShopList from "src/components/shop-list";
import ListFooter from "src/components/list-footer";
import { Icon, Grid } from "antd-mobile";
import { Skeleton, Carousel } from "antd";
import Avatar from "src/components/lazy-avatar";
import "./style.scss";

class Home extends PureComponent {
  componentDidMount() {
    console.log("home mount");
    const {
      addr,
      homeShopCategoryListLoading,
      getHomeShopCategoryList,
      nearbyShopListLoading,
      getNearbyShopList,
    } = this.props; // 改变footer的选中标签state
    if (homeShopCategoryListLoading) {
      getHomeShopCategoryList();
    }
    if (nearbyShopListLoading) {
      getNearbyShopList({
        latitude: addr.get("latitude"),
        longitude: addr.get("longitude"),
      });
    }
    // import ShopCategory from "src/page/shop-category/loadable.jsx";
    // import Location from "./page/location/loadable.jsx";
    // import Search from "./page/search/loadable.jsx";
    // import User from "./page/user/loadable.jsx";
    // import Shop from "./page/shop/loadable.jsx";
    console.log("home mount");
    import(
      /* webpackChunkName: "shopCategory" */ "src/page/shop-category/index.jsx"
    ).then(() => console.log("shopcategory import"));
    import(/* webpackChunkName: "Location" */ "src/page/location/index.jsx");
    import(/* webpackChunkName: "Search" */ "src/page/search/index.jsx");
    import(/* webpackChunkName: "User" */ "src/page/user/index.jsx");
    import(/* webpackChunkName: "Shop" */ "src/page/shop/index.jsx");
  }

  handleCategoryClick = (target, index) => {
    const { history } = this.props;
    const { text, id } = target;
    history.push(`/shop-category/${text}/${id}`);
  };

  loadMoreList = () => {
    const { addr, nearbyShopList, getNearbyShopList } = this.props;
    getNearbyShopList({
      latitude: addr.get("latitude"),
      longitude: addr.get("longitude"),
      offset: nearbyShopList.size,
    });
  };

  render() {
    const {
      addr,
      history,
      homeShopCategoryListLoading,
      homeShopCategoryList,
      nearbyShopListLoading,
      nearbyShopList,
    } = this.props;
    let data = [];
    if (homeShopCategoryListLoading) {
      // 加载中, 给grid传入占位
      data = new Array(16).fill({
        icon: <Skeleton.Avatar />,
        text: <Skeleton title={{ width: 50 }} paragraph={{ rows: 0 }} active />,
      });
    } else {
      data = homeShopCategoryList
        .map((item) => ({
          id: item.get("id"),
          icon: (
            <Avatar
              shape="square"
              src={"/imgapi" + item.get("image_url")}
              alt={item.get("title")}
            />
          ),
          text: item.get("title"),
        }))
        .toArray();
    }
    if (!addr.get("geohash")) {
      // 没有地址 跳转的地址选择页
      return <Redirect to="/location" />;
    } else {
      return (
        <div className="home-wrapper">
          <Header
            leftContent={
              <Icon
                type="search"
                size={"xs"}
                onClick={() => history.push("/search")}
              ></Icon>
            }
            midContent={
              <span onClick={() => history.push("/location")}>
                {addr.get("name")}
              </span>
            }
            rightContent={
              <svg
                className="icon"
                aria-hidden="true"
                onClick={() => history.push("/user")}
              >
                <use xlinkHref="#icon-wode-white-copy"></use>
              </svg>
            }
          />
          <div className="home-content-wrapper">
            <div className="content-wrapper">
              <Carousel dots>
                <Grid
                  data={data.slice(0, 8)}
                  columnNum={4}
                  onClick={this.handleCategoryClick}
                />
                <Grid
                  data={data.slice(8)}
                  columnNum={4}
                  onClick={this.handleCategoryClick}
                />
              </Carousel>
              <div className="white-space"></div>
              <ShopList
                dataList={nearbyShopList}
                loading={nearbyShopListLoading}
                title="附近商家"
                hitBottomCallback={this.loadMoreList}
              />
            </div>
          </div>
          <Footer selectedTab="homeTab" />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  addr: state.getIn(["location", "addr"]),
  homeShopCategoryListLoading: state.getIn([
    "home",
    "homeShopCategoryListLoading",
  ]),
  homeShopCategoryList: state.getIn(["home", "homeShopCategoryList"]),
  nearbyShopListLoading: state.getIn(["home", "nearbyShopListLoading"]),
  nearbyShopList: state.getIn(["home", "nearbyShopList"]),
});

const mapDispatchToProps = (dispatch) => ({
  getNearbyShopList(params) {
    dispatch(actionCreators.getNearbyShopList(params));
  },
  getHomeShopCategoryList() {
    dispatch(actionCreators.getHomeShopCategoryList());
  },
  getAddr() {
    dispatch(locationActionCreators.getAddr());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
