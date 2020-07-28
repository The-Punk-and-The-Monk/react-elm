import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { actionCreators } from "./store";
import { TabBar } from "antd-mobile";
// import * as S  from './style';
import "./style.scss";

const tabNameToPath = {
  homeTab: "/home",
  searchTab: "/search",
  orderTab: "/order",
  myTab: "/my",
};

class Footer extends PureComponent {
  handlePress = (selectedTab) => {
    this.props.changeSelectedTab(selectedTab);
    this.props.history.push(tabNameToPath[selectedTab]);
  };
  render() {
    const { selectedTab, hidden, fullscreen } = this.props;
    return (
      <div className="footer-wrapper">
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={hidden}
        >
          <TabBar.Item
            title="外卖"
            key="外卖"
            icon={<i className="iconfont icon-elema footer-icon"></i>}
            selectedIcon={
              <i className="iconfont icon-elema-blue footer-icon"></i>
            }
            selected={selectedTab === "homeTab"}
            // badge={1}
            onPress={() => {
              this.handlePress("homeTab");
            }}
            data-seed="logId"
          ></TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-iconset0394 footer-icon"></i>}
            selectedIcon={
              <i className="iconfont icon-iconset0394-blue footer-icon"></i>
            }
            title="搜索"
            key="搜索"
            // badge={'new'}
            selected={selectedTab === "searchTab"}
            onPress={() => {
              this.handlePress("searchTab");
            }}
            data-seed="logId1"
          >
            {/* {this.renderContent('Life')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-weibiaoti footer-icon"></i>}
            selectedIcon={
              <i className="iconfont icon-weibiaoti-blue footer-icon"></i>
            }
            title="订单"
            key="订单"
            // dot
            selected={selectedTab === "orderTab"}
            onPress={() => {
              this.handlePress("orderTab");
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-wode footer-icon"></i>}
            selectedIcon={
              <i className="iconfont icon-wode-blue footer-icon"></i>
            }
            title="我的"
            key="我的"
            selected={selectedTab === "myTab"}
            onPress={() => {
              this.handlePress("myTab");
            }}
          ></TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedTab: state.getIn(["footer", "selectedTab"]),
  hidden: state.getIn(["footer", "hidden"]),
  fullscreen: state.getIn(["footer", "fullscreen"]),
});

const mapDispatchToProps = (dispatch) => ({
  changeSelectedTab(selectedTab) {
    dispatch(actionCreators.changeSelectedTab(selectedTab));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer));
