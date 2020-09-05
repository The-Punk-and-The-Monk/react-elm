/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-08-01 18:56:33
 * @LastEditTime: 2020-09-03 11:33:28
 * @FilePath: /react-elm/src/components/shop-list/ShopListLowLevel.jsx
 * @Description: 餐馆列表
 */

import React from "react";
import { useHistory } from "react-router-dom";
import { Card, List } from "antd-mobile";
import { Rate, Skeleton } from "antd";
import Avatar from "src/components/lazy-avatar";
import ListFooter from "../list-footer";
import "./style.scss";

const Item = List.Item;
// const ShopList = (props) => {
//   /**
//    * datalist[] : 餐馆数据列表
//    * title: 列表的标题
//    * loading: datalist是否正在加载, 如果是会渲染占位元素,
//    * fakelistlen: 设置占位元素的listitem个数
//    */
//   const history = useHistory();
//   const {
//     dataList = [],
//     title = "",
//     loading = true,
//     fakeListLen = 20,
//     hitBottomCallback = null,
//   } = props;
//   let displayList = null;

//   function handleShopItemClick(e) {
//     const item = e.target.closest(".shop-list-item");
//     if (item) {
//       history.push(`/shop/${item.dataset.id}`);
//     }
//   }

//   if (loading) {
//     displayList = new Array(fakeListLen).fill(0).map((v, i) => (
//       <Item key={`fakelist-${i}`}>
//         <Skeleton paragraph={{ rows: 1 }} active />
//       </Item>
//     ));
//   } else {
//     displayList = dataList.map((data) => (
//       <Item
//         key={data.get("id")}
//         className="shop-list-item"
//         data-id={data.get("id")}
//       >
//         <div className="list-item-content-wrapper">
//           <div className="shop-list-item-avatar-wraper">
//             <Avatar
//               shape="square"
//               size={70}
//               src={"/img/" + data.get("image_path")}
//               alt={data.get("name")}
//             />
//           </div>

//           <div className="card-wrapper">
//             <Card full>
//               <Card.Header
//                 title={
//                   <div>
//                     {data.get("is_premium") ? (
//                       <span className="premium">品牌</span>
//                     ) : null}
//                     <span className="shop-name">{data.get("name")}</span>
//                   </div>
//                 }
//               />
//               <Card.Footer
//                 content={
//                   <div className="card-mid-wrapper">
//                     <Rate
//                       disabled
//                       allowHalf
//                       defaultValue={data.get("rating")}
//                     />
//                     <span className="recent-order-num">
//                       月售{data.get("recent_order_num")}单
//                     </span>
//                   </div>
//                 }
//               />

//               <Card.Footer
//                 content={`¥${data.get(
//                   "float_minimum_order_amount"
//                 )}起送 / 配送费约¥${data.get("float_delivery_fee")}`}
//                 extra={
//                   <div>
//                     {data.get("supports").map((support) => (
//                       <span
//                         key={support.get("icon_name")}
//                         className="support-icon"
//                       >
//                         {support.get("icon_name")}
//                       </span>
//                     ))}
//                   </div>
//                 }
//               />
//               <Card.Footer
//                 content={`${data.get("distance")} / ${data.get(
//                   "order_lead_time"
//                 )}`}
//                 extra={
//                   data.get("delivery_mode") ? (
//                     <div className="delivery-wrapper">
//                       <span>{data.get("delivery_mode").get("text")}</span>
//                       {data.get("delivery_mode").get("is_solid") ? (
//                         <span>准时达</span>
//                       ) : null}
//                     </div>
//                   ) : null
//                 }
//               />
//             </Card>
//           </div>
//         </div>
//       </Item>
//     ));
//   }
//   return (
//     <List className="shop-list-wrapper" onClick={handleShopItemClick}>
//       {title ? (
//         <Item>
//           <svg className="icon" aria-hidden="true">
//             <use xlinkHref="#icon-dianpu"></use>
//           </svg>
//           <span className="list-title">{title}</span>
//         </Item>
//       ) : null}

//       {displayList}
//       {hitBottomCallback ? (
//         <Item>
//           <ListFooter hitBottomCallback={hitBottomCallback} />
//         </Item>
//       ) : null}
//     </List>
//   );
// };

function ShopList(props) {
  /**
   * datalist[] : 餐馆数据列表
   * title: 列表的标题
   * loading: datalist是否正在加载, 如果是会渲染占位元素,
   * fakelistlen: 设置占位元素的listitem个数
   */
  const history = useHistory();
  const {
    dataList = [],
    title = "",
    loading = true,
    fakeListLen = 20,
    hitBottomCallback = null,
  } = props;
  let displayList = null;

  function handleShopItemClick(e) {
    const item = e.target.closest(".shop-list-item");
    if (item) {
      history.push(`/shop/${item.dataset.id}`);
    }
  }

  if (loading) {
    displayList = new Array(fakeListLen).fill(0).map((v, i) => (
      <Item key={`fakelist-${i}`}>
        <Skeleton paragraph={{ rows: 1 }} active />
      </Item>
    ));
  } else {
    displayList = dataList.map((data) => (
      <Item
        key={data.get("id")}
        className="shop-list-item"
        data-id={data.get("id")}
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
    ));
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

      {displayList}
      {hitBottomCallback ? (
        <Item>
          <ListFooter hitBottomCallback={hitBottomCallback} />
        </Item>
      ) : null}
    </List>
  );
}

export default React.memo(ShopList);
