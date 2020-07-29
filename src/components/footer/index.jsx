import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { TabBar } from "antd-mobile";
// import * as S  from './style';
import "./style.scss";

const tabPath = {
  homePath: "/home",
  searchPath: "/search",
  orderPath: "/order",
  userPath: "/user",
};

class Footer extends PureComponent {
  render() {
    const { selectedTab, hidden, fullscreen, history } = this.props;
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
            icon={
              <svg className="icon footer-icon" aria-hidden="true">
                <use xlinkHref="#icon-elema"></use>
              </svg>
            }
            selectedIcon={
              <svg className="icon footer-icon" aria-hidden="true">
                <use xlinkHref="#icon-elema-blue"></use>
              </svg>
            }
            selected={selectedTab === "homeTab"}
            // badge={1}
            onPress={() => {
              history.push(tabPath.homePath);
            }}
            data-seed="logId"
          ></TabBar.Item>
          <TabBar.Item
            icon={
              <svg className="icon footer-icon" aria-hidden="true">
                <use xlinkHref="#icon-iconset0394"></use>
              </svg>
            }
            selectedIcon={
              <svg className="icon footer-icon" aria-hidden="true">
                <use xlinkHref="#icon-iconset0394-blue"></use>
              </svg>
            }
            title="搜索"
            key="搜索"
            // badge={'new'}
            selected={selectedTab === "searchTab"}
            onPress={() => {
              history.push(tabPath.searchPath);
            }}
            data-seed="logId1"
          >
            {/* {this.renderContent('Life')} */}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <svg className="icon footer-icon" aria-hidden="true">
                <use xlinkHref="#icon-weibiaoti"></use>
              </svg>
            }
            selectedIcon={
              <svg className="icon footer-icon" aria-hidden="true">
                <use xlinkHref="#icon-weibiaoti-blue"></use>
              </svg>
            }
            title="订单"
            key="订单"
            // dot
            selected={selectedTab === "orderTab"}
            onPress={() => {
              history.push(tabPath.orderPath);
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={
              <svg className="icon footer-icon" aria-hidden="true">
                <use xlinkHref="#icon-wode"></use>
              </svg>
            }
            selectedIcon={
              <svg className="icon footer-icon" aria-hidden="true">
                <use xlinkHref="#icon-wode-blue"></use>
              </svg>
            }
            title="我的"
            key="我的"
            selected={selectedTab === "userTab"}
            onPress={() => {
              history.push(tabPath.userPath);
            }}
          ></TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default withRouter(Footer);
