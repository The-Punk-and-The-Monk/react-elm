/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-27 10:14:49
 * @LastEditTime: 2020-07-27 22:26:50
 * @FilePath: /react-elm/src/page/home/index.jsx
 * @Description:
 */

import React, { PureComponent, Fragment } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as locationActionCreators } from "src/page/location/store";
import Header from "src/components/header";
import Footer from "src/components/footer";
import RestaurantList from "src/components/restaurant-list";
import { Icon, Grid, WhiteSpace } from "antd-mobile";
import { Skeleton, Avatar } from "antd";
import "./style.scss";

class Home extends PureComponent {
  componentDidMount() {
    const {
      addr,
      getRestaurantCategoryList,
      getNearbyRestaurantList,
    } = this.props;
    getRestaurantCategoryList();
    getNearbyRestaurantList({
      latitude: addr.get("latitude"),
      longitude: addr.get("longitude"),
    });
  }

  render() {
    const {
      addr,
      restaurantCategoryListLoading,
      restaurantCategoryList,
      nearbyRestaurantListLoading,
      nearbyRestaurantList,
    } = this.props;
    let data = [];
    if (restaurantCategoryListLoading) {
      data = new Array(16).fill({
        icon: <Skeleton.Avatar />,
        text: <Skeleton title={{ width: 50 }} paragraph={{ rows: 0 }} active />,
      });
    } else {
      data = restaurantCategoryList
        .map((item) => ({
          icon: (
            <Avatar
              shape="square"
              size={50}
              src={"/imgapi" + item.get("image_url")}
              alt={item.get("title")}
            />
          ),
          // icon: "/imgapi" + item.get("image_url"),
          text: item.get("title"),
        }))
        .toArray();
    }

    return (
      <Fragment>
        <Header
          leftContent={<Icon type="search" size={"xs"}></Icon>}
          midContent={addr.get("name")}
          rightContent={<i className="iconfont icon-wode"></i>}
        >
          <Footer>
            <Grid data={data} columnNum={4} isCarousel />
            <div className="white-space"></div>
            <RestaurantList
              dataList={nearbyRestaurantList}
              loading={nearbyRestaurantListLoading}
              title="附近商家"
            />
          </Footer>
        </Header>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  addr: state.getIn(["location", "addr"]),
  restaurantCategoryListLoading: state.getIn([
    "home",
    "restaurantCategoryListLoading",
  ]),
  restaurantCategoryList: state.getIn(["home", "restaurantCategoryList"]),
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
  getRestaurantCategoryList() {
    dispatch(actionCreators.getRestaurantCategoryList());
  },
  getAddr() {
    dispatch(locationActionCreators.getAddr());
  },
});

const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

const HomeRouter = () => {
  const dispatch = useDispatch();
  dispatch(locationActionCreators.getAddr());
  const addr = useSelector((state) => state.getIn(["location", "addr"]));
  if (!addr.get("geohash")) {
    const history = useHistory();
    history.push("/location");
    return null;
  }
  return <ConnectedHome />;
};

export default HomeRouter;
