/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-27 10:14:49
 * @LastEditTime: 2020-07-28 17:46:37
 * @FilePath: /react-elm/src/page/home/index.jsx
 * @Description:
 */

import React, { PureComponent, Fragment } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as locationActionCreators } from "src/page/location/store";
import { actionCreators as footerActionCreators } from "src/components/footer/store";
import Header from "src/components/header";
import Footer from "src/components/footer";
import RestaurantList from "src/components/restaurant-list";
import { Icon, Grid } from "antd-mobile";
import { Skeleton, Avatar, Carousel } from "antd";
import BScroll from "better-scroll";
import "./style.scss";

class Home extends PureComponent {
  componentDidMount() {
    console.log("home mount");
    const {
      addr,
      homeRestaurantCategoryListLoading,
      getHomeRestaurantCategoryList,
      nearbyRestaurantListLoading,
      getNearbyRestaurantList,
      changeSelectedTab,
    } = this.props;
    changeSelectedTab("homeTab"); // 改变footer的选中标签state
    if (homeRestaurantCategoryListLoading) {
      getHomeRestaurantCategoryList();
    }
    if (nearbyRestaurantListLoading) {
      getNearbyRestaurantList({
        latitude: addr.get("latitude"),
        longitude: addr.get("longitude"),
      });
    }
    // if (addr.get("geohash")) {
    //   const wrapper = document.querySelector(".home-content-wrapper");
    //   this.scroll = new BScroll(wrapper);
    // }
  }

  // componentDidUpdate() {
  //   if (this.scroll) {
  //     this.scroll.refresh();
  //   }
  // }
  handleCategoryClick = (target, index) => {
    const { history } = this.props;
    const { text, id } = target;
    history.push(`/food-category/${text}/${id}`);
  };

  render() {
    const {
      addr,
      history,
      homeRestaurantCategoryListLoading,
      homeRestaurantCategoryList,
      nearbyRestaurantListLoading,
      nearbyRestaurantList,
    } = this.props;
    let data = [];
    if (homeRestaurantCategoryListLoading) {
      // 加载中, 给grid传入占位
      data = new Array(16).fill({
        icon: <Skeleton.Avatar />,
        text: <Skeleton title={{ width: 50 }} paragraph={{ rows: 0 }} active />,
      });
    } else {
      data = homeRestaurantCategoryList
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
            rightContent={<i className="iconfont icon-wode"></i>}
          />
          <div className="home-content-wrapper">
            <div className="content-wrapper">
              <Carousel dots>
                <Grid
                  data={data.slice(0, 8)}
                  columnNum={4}
                  onClick={this.handleCategoryClick}
                />
                <Grid data={data.slice(8)} columnNum={4} />
              </Carousel>
              <div className="white-space"></div>
              <RestaurantList
                dataList={nearbyRestaurantList}
                loading={nearbyRestaurantListLoading}
                title="附近商家"
              />
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  addr: state.getIn(["location", "addr"]),
  homeRestaurantCategoryListLoading: state.getIn([
    "home",
    "homeRestaurantCategoryListLoading",
  ]),
  homeRestaurantCategoryList: state.getIn([
    "home",
    "homeRestaurantCategoryList",
  ]),
  nearbyRestaurantListLoading: state.getIn([
    "home",
    "nearbyRestaurantListLoading",
  ]),
  nearbyRestaurantList: state.getIn(["home", "nearbyRestaurantList"]),
});

const mapDispatchToProps = (dispatch) => ({
  getNearbyRestaurantList({ latitude, longitude }) {
    dispatch(actionCreators.getNearbyRestaurantList({ latitude, longitude }));
  },
  getHomeRestaurantCategoryList() {
    dispatch(actionCreators.getHomeRestaurantCategoryList());
  },
  getAddr() {
    dispatch(locationActionCreators.getAddr());
  },
  changeSelectedTab(targetTab) {
    dispatch(footerActionCreators.changeSelectedTab(targetTab));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
