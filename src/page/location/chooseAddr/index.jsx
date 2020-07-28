import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actionCreators } from "../store";
import Header from "src/components/header";
import { List, SearchBar, Button, WhiteSpace, WingBlank } from "antd-mobile";
import "./style.scss";

const Item = List.Item;
const Brief = Item.Brief;

// 选择详细地址页面, 需要city有值
class ChooseAddr extends PureComponent {
  componentDidMount() {
    const { city } = this.props;
    if (!city.get("name")) {
      this.props.history.push("/location/city");
    } else {
      this.searchBar.focus();
    }
    this.props.clearSearchAddrList(); // 进入页面清空搜索结果列表
    this.props.getSearchAddrHistory(); // 进入页面从localStorage中取出搜索历史列表
  }

  handleAddrClick = (addr) => {
    this.props.pushSearchAddrHistory(addr).then(() => {
      // 把用户选中的搜索结果条目push到搜索历史中, 函数会更新localStorage, 然后跳转到home
      this.props.history.push("/");
    });
  };

  render() {
    const {
      city,
      searchAddr,
      searchAddrList,
      searchAddrHistoryList,
    } = this.props;

    // 搜索结果区域
    const searchResultsArea = searchAddrList.toJS().map((addr) => (
      <Item
        key={addr.name + "-" + addr.address}
        onClick={() => this.handleAddrClick(addr)}
      >
        {addr.name} <Brief>{addr.address}</Brief>
      </Item>
    ));

    // 搜索历史区域
    const searchHistoryArea = searchAddrHistoryList.toJS().map((addr) => (
      <Item
        key={addr.name + "-" + addr.address}
        onClick={() => this.handleAddrClick(addr)}
      >
        {addr.name} <Brief>{addr.address}</Brief>
      </Item>
    ));

    return (
      <Fragment>
        <Header
          leftContent={
            <i
              className="iconfont icon-zuojiantou"
              onClick={() => this.props.history.go(-1)}
            ></i>
          }
          midContent={city.get("name")}
          rightContent={
            <span onClick={() => this.props.history.push("/location/city")}>
              切换城市
            </span>
          }
        />
        <div className="chooseaddr-wrapper">
          <SearchBar
            placeholder="搜索详细地址"
            ref={(ref) => (this.searchBar = ref)}
            onSubmit={(value) => searchAddr(city.get("id"), value)}
            onCancel={() => this.props.clearSearchAddrList()}
            showCancelButton
          />

          {/* 有搜索结果区域就显示搜索结果 */}
          {searchResultsArea.length ? <List>{searchResultsArea}</List> : null}
          {/* 没有搜索结果且搜索历史不为空 */}
          {!searchResultsArea.length && searchHistoryArea.length ? (
            <List renderHeader={() => "搜索历史"}>{searchHistoryArea}</List>
          ) : null}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    city: state.getIn(["location", "city"]),
    searchAddrList: state.getIn(["location", "searchAddrList"]),
    searchAddrHistoryList: state.getIn(["location", "searchAddrHistoryList"]),
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchAddr(cityId, keyword) {
    dispatch(actionCreators.searchAddr(cityId, keyword));
  },
  clearSearchAddrList() {
    dispatch(actionCreators.clearSearchAddrList());
  },
  getSearchAddrHistory() {
    dispatch(actionCreators.getSearchAddrHistory());
  },
  pushSearchAddrHistory(addr) {
    return dispatch(actionCreators.pushSearchAddrHistory(addr));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChooseAddr));
