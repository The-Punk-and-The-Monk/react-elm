/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-08-01 18:56:33
 * @LastEditTime: 2020-09-06 09:09:05
 * @FilePath: /react-elm/src/components/shop-list/ShopListScroll.jsx
 * @Description: 餐馆列表
 */

import React from "react";
import { withRouter } from "react-router-dom";
import { Card, List } from "antd-mobile";
import { Rate, Skeleton, Avatar } from "antd";
// import Avatar from "src/components/lazy-avatar";
import ListFooter from "../list-footer";
import { throttle } from "src/utils/index.jsx";
import "./style.scss";

const Item = List.Item;

class ShopList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stateInited: false,
      listItemHeight: 0,
      cacheLen: 0,
      startIdx: 0,
      endIdx: 0,
      oneScreenLen: 0,
      oneScreenPx: 0,
    };
    this.firstListItem = null;
    this.lastListItem = null;
    this.aboveListDiv = null;
    this.belowListDiv = null;
    this.throttledUpdateIdx = throttle(this.updateIdx, 16);
  }

  componentDidMount() {
    this.initScrollState();
    // this.checkDataListLen();
    document.addEventListener("scroll", this.throttledUpdateIdx);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.throttledUpdateIdx);
  }

  componentDidUpdate() {
    this.initScrollState();
    // this.checkDataListLen();
    // if (this.state.stateInited) {
    // }
  }

  updateState = (params) => {
    console.log("updatestate");
    let { endIdx } = params;
    let { dataList, hitBottomCallback } = this.props;
    if (endIdx > dataList.size) {
      hitBottomCallback();
    }
    this.setState(params);
  };

  updateIdx = (e) => {
    if (!this.state.stateInited) return;
    let {
      cacheLen,
      oneScreenLen,
      listItemHeight,
      startIdx,
      endIdx,
      oneScreenPx,
    } = this.state;

    let firstListItemTop = this.aboveListDiv.getBoundingClientRect().top;
    let lastListItemBottom = this.belowListDiv.getBoundingClientRect().bottom;
    if (firstListItemTop >= 0 || -firstListItemTop < oneScreenPx * 0.5) {
      startIdx = Math.max(startIdx - oneScreenLen, 0);
      endIdx = Math.max(endIdx - oneScreenLen, cacheLen);
      this.updateState({
        startIdx,
        endIdx,
      });
    } else if (
      lastListItemBottom < oneScreenPx ||
      lastListItemBottom < oneScreenPx * 1.5
    ) {
      startIdx = Math.max(startIdx + oneScreenLen, 0);
      endIdx = Math.max(endIdx + oneScreenLen, cacheLen);
      this.updateState({
        startIdx,
        endIdx,
      });
    }
  };

  initScrollState = () => {
    if (!this.state.stateInited) {
      console.log("initstate");
      let listItem = document.getElementsByClassName("shop-list-item")[0];
      if (listItem) {
        let listItem = document.getElementsByClassName("shop-list-item")[0];
        let listItemRect = listItem.getBoundingClientRect();
        let listItemHeight = listItemRect.height;
        let idealPortHeight = window.innerHeight;
        let oneScreenLen = Math.ceil(idealPortHeight / listItemHeight);
        let cacheLen = oneScreenLen * 5;
        let oneScreenPx = oneScreenLen * listItemHeight;

        this.aboveListDiv = document.querySelector("#aboveListDiv");
        this.belowListDiv = document.querySelector("#belowListDiv");
        this.updateState({
          stateInited: true,
          listItemHeight,
          cacheLen,
          oneScreenPx,
          startIdx: 0,
          endIdx: cacheLen,
          oneScreenLen,
        });
      }
    }
  };

  render() {
    console.log("render");
    let { stateInited, startIdx, endIdx, listItemHeight } = this.state;
    if (!stateInited) {
      return this.getShopList(this.props);
    } else {
      return this.getShopList(this.props, startIdx, endIdx, listItemHeight);
    }
  }

  getShopList = (props, startIdx, endIdx, listItemHeight) => {
    /**
     * datalist[] : 餐馆数据列表
     * title: 列表的标题
     * loading: datalist是否正在加载, 如果是会渲染占位元素,
     * fakelistlen: 设置占位元素的listitem个数
     */
    // const history = useHistory();
    const {
      dataList = [],
      title = "",
      loading = true,
      fakeListLen = 20,
      hitBottomCallback = null,
    } = props;
    let displayList = null;
    startIdx = startIdx === undefined ? 0 : startIdx;
    endIdx = endIdx === undefined ? dataList.size : endIdx;
    listItemHeight = listItemHeight === undefined ? 0 : listItemHeight;

    const handleShopItemClick = (e) => {
      const item = e.target.closest(".shop-list-item");
      const { history } = this.props;
      if (item) {
        history.push(`/shop/${item.dataset.id}`);
      }
    };

    if (loading) {
      displayList = new Array(fakeListLen).fill(0).map((v, i) => (
        <Item key={`fakelist-${i}`}>
          <Skeleton paragraph={{ rows: 1 }} active />
        </Item>
      ));
    } else {
      console.log(startIdx, endIdx);
      displayList = dataList.slice(startIdx, endIdx).map((data, idx, arr) => {
        return (
          <Item
            key={data.get("id")}
            className="shop-list-item"
            data-id={data.get("id")}
            data-isfirst={idx === 0}
            data-islast={idx === arr.size - 1}
          >
            <div className="list-item-content-wrapper">
              <div className="shop-list-item-avatar-wraper">
                <Avatar
                  shape="square"
                  src={"/img/" + data.get("image_path")}
                  alt={data.get("name")}
                />
              </div>

              <div className="card-wrapper">
                <Card full>
                  <Card.Header
                    title={
                      <div>
                        {data.get("is_premium") ? (
                          <span className="premium">品牌</span>
                        ) : null}
                        <span className="shop-name">{data.get("name")}</span>
                      </div>
                    }
                  />
                  <Card.Footer
                    content={
                      <div className="card-mid-wrapper">
                        <Rate
                          disabled
                          allowHalf
                          defaultValue={data.get("rating")}
                        />
                        <span className="recent-order-num">
                          月售{data.get("recent_order_num")}单
                        </span>
                      </div>
                    }
                  />

                  <Card.Footer
                    content={`¥${data.get(
                      "float_minimum_order_amount"
                    )}起送 / 配送费约¥${data.get("float_delivery_fee")}`}
                    extra={
                      <div>
                        {data.get("supports").map((support) => (
                          <span
                            key={support.get("icon_name")}
                            className="support-icon"
                          >
                            {support.get("icon_name")}
                          </span>
                        ))}
                      </div>
                    }
                  />
                  <Card.Footer
                    content={`${data.get("distance")} / ${data.get(
                      "order_lead_time"
                    )}`}
                    extra={
                      data.get("delivery_mode") ? (
                        <div className="delivery-wrapper">
                          <span>{data.get("delivery_mode").get("text")}</span>
                          {data.get("delivery_mode").get("is_solid") ? (
                            <span>准时达</span>
                          ) : null}
                        </div>
                      ) : null
                    }
                  />
                </Card>
              </div>
            </div>
          </Item>
        );
      });
    }
    return (
      <List className="shop-list-wrapper" onClick={handleShopItemClick}>
        {title ? (
          <Item>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-dianpu"></use>
            </svg>
            <span className="list-title">{title}</span>
          </Item>
        ) : null}
        <div style={{ paddingTop: startIdx * listItemHeight }}></div>
        <div id="aboveListDiv"></div>
        {displayList}
        <div id="belowListDiv"></div>
        {/* {hitBottomCallback ? (
          <Item>
            <ListFooter hitBottomCallback={hitBottomCallback} />
          </Item>
        ) : null} */}
      </List>
    );
  };
}

export default withRouter(ShopList);
