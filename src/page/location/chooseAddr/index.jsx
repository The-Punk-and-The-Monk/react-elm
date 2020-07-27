import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actionCreators } from "../store";
import Header from "src/components/header";
import { List, SearchBar, Button, WhiteSpace, WingBlank } from "antd-mobile";


const Item = List.Item;
const Brief = Item.Brief;

class ChooseAddr extends PureComponent {
  componentDidMount() {
    const { city } = this.props;
    if (!city.get("name")) {
      this.props.history.push("/location/city");
    } else {
      this.searchBar.focus();
    }
    this.props.clearSearchAddrList()
    this.props.getSearchAddrHistory()
  }

  handleAddrClick = (addr) => {
    this.props.pushSearchAddrHistory(addr).then(() => {
      this.props.history.push("/")
    })
  }

  render() {
    const {
      city,
      searchAddr,
      searchAddrList,
      searchAddrHistoryList,
    } = this.props;
    const searchResultsArea = searchAddrList.toJS().map((addr) => (
      <Item key={addr.name + "-" + addr.address} onClick={() => this.handleAddrClick(addr)}>
        {addr.name} <Brief>{addr.address}</Brief>
      </Item>
    ));

    const searchHistoryArea = searchAddrHistoryList.toJS().map((addr) => (
      <Item key={addr.name + "-" + addr.address} onClick={() => this.handleAddrClick(addr)}>
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

        <SearchBar
          placeholder="搜索详细地址"
          ref={(ref) => (this.searchBar = ref)}
          onSubmit={(value) => searchAddr(city.get("id"), value)}
          onCancel={() => this.props.clearSearchAddrList()}
          showCancelButton
        />

        {searchResultsArea.length ? <List>{searchResultsArea}</List> : null}
        {!searchResultsArea.length && searchHistoryArea.length ? (
          <List renderHeader={() => "搜索历史"}>{searchHistoryArea}</List>
        ) : null}
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
  clearSearchAddrList(){
    dispatch(actionCreators.clearSearchAddrList());
  },
  getSearchAddrHistory() {
    dispatch(actionCreators.getSearchAddrHistory());
  },
  pushSearchAddrHistory(addr) {
    return dispatch(actionCreators.pushSearchAddrHistory(addr));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChooseAddr));
