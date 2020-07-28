import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./store";
import { TabBar } from "antd-mobile";
// import * as S  from './style';
import "./style.scss";

const Footer = (props) => {
  const { selectedTab, hidden, fullscreen } = useSelector((state) => {
    const footer = state.get("footer");
    return {
      selectedTab: footer.get("selectedTab"),
      hidden: footer.get("hidden"),
      fullscreen: footer.get("fullscreen"),
    };
  });

  const dispatch = useDispatch();

  const changeSelectedTab = (obj) => {
    dispatch(actionCreators.changeSelectedTab(obj.selectedTab));
  };
  // useEffect(() => {
  // }, [selectedTab, hidden, fullscreen]);

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
            selected={selectedTab === "blueTab"}
            // badge={1}
            onPress={() => {
              changeSelectedTab({
                selectedTab: "blueTab",
              });
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
            selected={selectedTab === "redTab"}
            onPress={() => {
              changeSelectedTab({
                selectedTab: "redTab",
              });
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
            selected={selectedTab === "greenTab"}
            onPress={() => {
              changeSelectedTab({
                selectedTab: "greenTab",
              });
            }}
          ></TabBar.Item>
          <TabBar.Item
            icon={<i className="iconfont icon-wode footer-icon"></i>}
            selectedIcon={
              <i className="iconfont icon-wode-blue footer-icon"></i>
            }
            title="我的"
            key="我的"
            selected={selectedTab === "yellowTab"}
            onPress={() => {
              changeSelectedTab({
                selectedTab: "yellowTab",
              });
            }}
          ></TabBar.Item>
        </TabBar>
      </div>
  );
};

export default Footer;

// class Home extends PureComponent {

//   componentDidMount() {

//   }

//   render() {
//     return (
//       <div></div>
//     );
//   }
// }

// const mapState = (state) => ({
//   // showScrollTop: state.get('home').get('showScrollTop')
// });

// const mapDispatch = (dispatch) => ({
//   // changeHomeData() {
//   //   dispatch(actionCreators.getHomeData())
//   // },
// });

// export default connect(mapState, mapDispatch)(Home);
