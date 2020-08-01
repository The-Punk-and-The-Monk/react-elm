/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-27 10:14:49
 * @LastEditTime: 2020-08-01 22:39:28
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
import { Icon, Grid } from "antd-mobile";
import { Skeleton, Avatar, Carousel } from "antd";
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
  }

  handleCategoryClick = (target, index) => {
    const { history } = this.props;
    const { text, id } = target;
    history.push(`/shop-category/${text}/${id}`);
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
              size={50}
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
  getNearbyShopList({ latitude, longitude }) {
    dispatch(actionCreators.getNearbyShopList({ latitude, longitude }));
  },
  getHomeShopCategoryList() {
    dispatch(actionCreators.getHomeShopCategoryList());
  },
  getAddr() {
    dispatch(locationActionCreators.getAddr());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
