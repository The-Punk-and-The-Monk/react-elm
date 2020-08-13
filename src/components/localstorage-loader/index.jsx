import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { actionCreators as locationActionCreators } from "src/page/location/store";

// 在最开始挂载, 负责从localStorage中取数据
class LocalStorageLoader extends PureComponent {
  constructor(props) {
    super(props);
    const { changeAddr } = props;
    const addr = JSON.parse(localStorage.getItem("addr"));
    if (!addr || !addr.geohash) {
      //初始定位到华科
      changeAddr({
        address: "湖北省武汉市洪山区珞喻路1037号",
        geohash: "30.51311,114.418862",
        latitude: 30.51311,
        longitude: 114.418862,
        name: "华中科技大学",
      });
    } else {
      changeAddr(addr);
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  addr: state.getIn(["location", "addr"]),
});

const mapDispatchToProps = (dispatch) => ({
  getAddr() {
    dispatch(locationActionCreators.getAddr());
  },
  changeAddr(addr) {
    dispatch(locationActionCreators.changeAddr(addr));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocalStorageLoader);
