import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { actionCreators as locationActionCreators } from "src/page/location/store";

// 在最开始挂载, 负责从localStorage中取数据
class LocalStorageLoader extends PureComponent {
  constructor(props) {
    super(props);
    const { addr, getAddr } = props;
    if (!addr.get("geohash")) {
      getAddr();
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
});

export default connect(mapStateToProps, mapDispatchToProps)(LocalStorageLoader);
