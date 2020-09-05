/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-08-01 18:56:33
 * @LastEditTime: 2020-09-05 15:23:41
 * @FilePath: /react-elm/src/components/shop-list/ShopListIntersectionObserver.jsx
 * @Description: 餐馆列表
 */

import React from "react";
import { useHistory } from "react-router-dom";
import { Card, List } from "antd-mobile";
import { Rate, Skeleton, Avatar } from "antd";
// import Avatar from "src/components/lazy-avatar";
import ListFooter from "../list-footer";
import "./style.scss";

const Item = List.Item;

class ShopList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateInited: false,
      listItemHeight: 0,
      cacheLen: 0,
      startIdx: 0,
      endIdx: 0,
      oneScreenLen: 0,
    };
    this.firstListItem = null;
    this.lastListItem = null;
    this.observer = new IntersectionObserver(this.observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });
  }

  // shouldComponentUpdate(nextState, nextProps) {
  //   if (this.state.stateInited) {
  //     if (this.state.startIdx !== nextState.startIdx) {
  //       return true;
  //     }
  //     if (this.state.endIdx !== nextState.endIdx) {
  //       return true;
  //     }
  //     if (this.props.dataList.size !== nextProps.size) {
  //       return true;
  //     }
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  componentDidMount() {
    console.log("didmount");
    this.initScrollState();
    // this.checkDataListLen();
  }

  componentDidUpdate() {
    this.initScrollState();
    // this.checkDataListLen();
    if (this.state.stateInited) {
      const firstListItem = document.querySelector("[data-isfirst=true]");
      const lastListItem = document.querySelector("[data-islast=true]");
      if (
        this.firstListItem !== firstListItem ||
        this.lastListItem !== lastListItem
      ) {
        this.firstListItem = firstListItem;
        this.lastListItem = lastListItem;
        console.log("didupdate");
        try {
          this.observer.observe(firstListItem);
          this.observer.observe(lastListItem);
        } catch (e) {
          console.log(e);
        }
      }

      // try {
      //   this.observer.observe(firstListItem);
      //   this.observer.observe(lastListItem);
      // } catch (e) {
      //   console.log(e);
      // }
    }
  }

  observerCallback = (entries, observer) => {
    console.log("observercallback");
    entries.forEach((entry, idx) => {
      // console.log(entry);
      if (entry.isIntersecting && entry.target.dataset["isfirst"] === "true") {
        let { startIdx, endIdx, oneScreenLen, cacheLen } = this.state;
        startIdx = Math.max(startIdx - oneScreenLen, 0);
        endIdx = Math.max(endIdx - oneScreenLen, cacheLen);
        observer.unobserve(entry.target);
        this.updateState({
          startIdx,
          endIdx,
        });
      }
      if (entry.isIntersecting && entry.target.dataset["islast"] === "true") {
        let { startIdx, endIdx, oneScreenLen, cacheLen } = this.state;
        startIdx = Math.max(startIdx + oneScreenLen, 0);
        endIdx = Math.max(endIdx + oneScreenLen, cacheLen);
        observer.unobserve(entry.target);
        this.updateState({
          startIdx,
          endIdx,
        });
      }
    });
  };

  updateState = (params) => {
    console.log("updatestate");
    let { endIdx } = params;
    let { dataList, hitBottomCallback } = this.props;
    if (endIdx > dataList.size) {
      hitBottomCallback();
    }
    this.setState(params);
  };

  // checkDataListLen = () => {
  //   console.log("checkdatalistlen");
  //   let { endIdx } = this.state;
  //   let { dataList, hitBottomCallback } = this.props;
  //   if (endIdx > dataList.size) {
  //     hitBottomCallback();
  //   }
  // };

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
        let cacheLen = oneScreenLen * 3;

        this.updateState({
          stateInited: true,
          listItemHeight,
          cacheLen,
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

    function handleShopItemClick(e) {
      const item = e.target.closest(".shop-list-item");
      // if (item) {
      //   history.push(`/shop/${item.dataset.id}`);
      // }
    }

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
                  size={70}
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
        {displayList}
        {/* {hitBottomCallback ? (
          <Item>
            <ListFooter hitBottomCallback={hitBottomCallback} />
          </Item>
        ) : null} */}
      </List>
    );
  };
}

export default ShopList;
