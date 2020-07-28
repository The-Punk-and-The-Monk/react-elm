import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actionCreators } from "./store";
import { actionCreators as footerActionCreators } from "src/components/footer/store";

import Header from "src/components/header";
import RestaurantList from "src/components/restaurant-list";
import OptionsCascader from "./components/options-cascader";

import "./style.scss";

class FoodCategory extends PureComponent {
  componentDidMount() {
    console.log("foodcategory mount");
    const { id } = this.props.match.params;
    const {
      addr,
      dispalyRestaurantListLoading,
      getRestaurantList,
    } = this.props;
    if (dispalyRestaurantListLoading) {
      getRestaurantList({
        longitude: addr.get("longitude"),
        latitude: addr.get("latitude"),
        restaurant_category_id: id,
      });
    }
  }
  render() {
    const { history } = this.props;
    const { title } = this.props.match.params;
    let {
      dispalyRestaurantListLoading: displayLoading,
      dispalyRestaurantList: displayList,
    } = this.props;
    return (
      <Fragment>
        <Header
          leftContent={
            <i
              className="iconfont icon-zuojiantou"
              onClick={() => history.go(-1)}
            ></i>
          }
          midContent={title}
        />
        <OptionsCascader />
        <div className="foodcategory-displaylist-wrapper">
          <RestaurantList dataList={displayList} loading={displayLoading} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  addr: state.getIn(["location", "addr"]),
  dispalyRestaurantListLoading: state.getIn([
    "foodCategory",
    "dispalyRestaurantListLoading",
  ]),
  dispalyRestaurantList: state.getIn(["foodCategory", "dispalyRestaurantList"]),
});

const mapDispatchToProps = (dispatch) => ({
  getRestaurantList(params) {
    dispatch(actionCreators.getRestaurantList(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FoodCategory));
