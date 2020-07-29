import React from "react";
import { Card, List } from "antd-mobile";
import { Rate, Skeleton, Avatar } from "antd";
import "./style.scss";

const Item = List.Item;
const RestaurantList = (props) => {
  /**
   * datalist[] : 餐馆数据列表
   * title: 列表的标题
   * loading: datalist是否正在加载, 如果是会渲染占位元素,
   * fakelistlen: 设置占位元素的listitem个数
   */
  const { dataList = [], title = "", loading = true, fakeListLen = 20 } = props;
  let displayList = null;
  if (loading) {
    displayList = new Array(fakeListLen).fill(0).map((v, i) => (
      <Item key={`fakelist-${i}`}>
        <Skeleton paragraph={{ rows: 1 }} active />
      </Item>
    ));
  } else {
    displayList = dataList.map((data) => (
      <Item key={data.get("id")}>
        <div className="list-item-content-wrapper">
          <div className="restaurant-list-item-avatar-wraper">
            <Avatar
              shape="square"
              size={80}
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
                    <span>{data.get("name")}</span>
                  </div>
                }
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
              <div className="card-mid-wrapper">
                <Rate disabled allowHalf defaultValue={data.get("rating")} />
                <span className="recent-order-num">
                  月售{data.get("recent_order_num")}单
                </span>

                {data.get("delivery_mode") ? (
                  <div className="delivery-wrapper">
                    <span>{data.get("delivery_mode").get("text")}</span>
                    {data.get("delivery_mode").get("is_solid") ? (
                      <span>准时达</span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <Card.Footer
                content={`¥${data.get(
                  "float_minimum_order_amount"
                )}起送 / 配送费约¥${data.get("float_delivery_fee")}`}
                extra={`${data.get("distance")} / ${data.get(
                  "order_lead_time"
                )}`}
              />
            </Card>
          </div>
        </div>
      </Item>
    ));
  }
  return (
    <List className="restaurant-list-wrapper">
      {title ? (
        <Item>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-dianpu"></use>
          </svg>
          <span className="list-title">{title}</span>
        </Item>
      ) : null}

      {displayList}
    </List>
  );
};

export default RestaurantList;
