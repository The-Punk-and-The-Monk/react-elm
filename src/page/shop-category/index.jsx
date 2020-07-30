import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actionCreators } from "./store";

import Header from "src/components/header";
import ShopList from "src/components/shop-list";
import OptionsCascader from "./components/options-cascader";

import "./style.scss";

class ShopCategory extends PureComponent {
  componentDidMount() {
    console.log("shopcategory mount");
    const { id } = this.props.match.params;
    const {
      addr,
      dispalyShopListLoading,
      getShopList,
      setShopList,
    } = this.props;

    // 每次进入页面重新加载数据
    setShopList([]);
    getShopList({
      longitude: addr.get("longitude"),
      latitude: addr.get("latitude"),
      shop_category_id: id,
    });
  }
  render() {
    const { history } = this.props;
    const { title } = this.props.match.params;
    let {
      dispalyShopListLoading: displayLoading,
      dispalyShopList: displayList,
    } = this.props;
    return (
      <Fragment>
        <Header
          leftContent={
            <i onClick={() => history.go(-1)}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-zuojiantou"></use>
              </svg>
            </i>
          }
          midContent={title}
        />
        <OptionsCascader />
        <div className="shopcategory-displaylist-wrapper">
          <ShopList dataList={displayList} loading={displayLoading} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  addr: state.getIn(["location", "addr"]),
  dispalyShopListLoading: state.getIn([
    "shopCategory",
    "dispalyShopListLoading",
  ]),
  dispalyShopList: state.getIn(["shopCategory", "dispalyShopList"]),
});

const mapDispatchToProps = (dispatch) => ({
  getShopList(params) {
    dispatch(actionCreators.getShopList(params));
  },
  setShopList(data) {
    dispatch(actionCreators.setShopList(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShopCategory));
