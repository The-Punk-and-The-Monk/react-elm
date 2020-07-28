import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actionCreators } from "../store";
import Header from "src/components/header";
import { List, Grid } from "antd-mobile";

import "./style.scss";

const Item = List.Item;
const Brief = Item.Brief;

class ChooseCity extends PureComponent {
  componentDidMount() {
    const {
      city,
      hotCityList,
      allCityMap,
      guessCity,
      getHotCities,
      getAllCity,
    } = this.props;
    if (!city.get("name")) {
      guessCity();
    }
    if (!hotCityList.size) {
      getHotCities();
    }
    if (!allCityMap.size) {
      getAllCity();
    }
  }

  // 用户选中城市, 改变city state, 然后跳转到选择详情地址页
  handleClick = (city) => {
    this.props
      .changeCity(city)
      .then(() => this.props.history.push("/location/addr"));
  };

  render() {
    const { city, hotCityList, allCityMap } = this.props;

    const hotCityData = hotCityList.toJS();

    const allCity = allCityMap
      .map((v, k) => {
        return {
          k: k,
          citys: v,
        };
      })
      .toList()
      .toJS()
      .map((item) => {
        return (
          <Fragment key={item.k}>
            <List className="grid-title">
              <Item>{item.k}</Item>
            </List>

            <Grid
              data={item.citys}
              columnNum={4}
              square={false}
              renderItem={(city) => (
                <div className="grid-item">
                  <span onClick={() => this.handleClick(city)}>
                    {city.name}
                  </span>
                </div>
              )}
            />
          </Fragment>
        );
      });

    return (
      <Fragment>
        <Header leftContent="ele.me" rightContent="登录|注册" />
        <div className="choosecity-wrapper">
          <List className="my-list">
            <Item
              extra={city.get("name") || ""}
              wrap
              arrow="horizontal"
              onClick={() => this.handleClick(city)}
            >
              当前城市:
              <Brief>定位不准时, 请在城市列表中选择</Brief>
            </Item>
          </List>
          <List className="grid-title">
            <Item>热门城市</Item>
          </List>
          <Grid
            data={hotCityData}
            columnNum={4}
            square={false}
            renderItem={(city) => (
              <div className="grid-item">
                <span onClick={() => this.handleClick(city)}>{city.name}</span>
              </div>
            )}
          />

          {allCity}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    city: state.getIn(["location", "city"]),
    hotCityList: state.getIn(["location", "hotCityList"]),
    allCityMap: state.getIn(["location", "allCityMap"]),
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCity(city) {
    return dispatch(actionCreators.changeCity(city));
  },
  guessCity() {
    dispatch(actionCreators.guessCity());
  },
  getHotCities() {
    dispatch(actionCreators.getHotCities());
  },
  getAllCity() {
    dispatch(actionCreators.getAllCity());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChooseCity));
