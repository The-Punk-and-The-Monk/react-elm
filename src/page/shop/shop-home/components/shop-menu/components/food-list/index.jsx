import React from "react";
import {
  Row,
  Col,
  Avatar,
  Skeleton,
  Layout,
  Menu,
  List,
  Modal,
  Radio,
  message,
} from "antd";

const FoodList = (props) => {
  const {
    shopId,
    menu,
    shoppingCart,
    addFoodToCart,
    showSpecModal,
    decreaseFoodFromCart,
  } = props;

  function handleSubClick(foodItem) {
    if (foodItem.get("specfoods").size === 1) {
      decreaseFoodFromCart(getFoodParamsFromFoodItem(foodItem));
    } else {
      message.info("多规格商品请到购物车删除");
    }
  }

  function getFoodParamsFromFoodItem(foodItem) {
    return {
      shopId,
      foodId: foodItem.getIn(["specfoods", 0, "food_id"]),
      foodCategoryId: foodItem.get("category_id"),
      itemId: foodItem.get("item_id"),
      name: foodItem.getIn(["specfoods", 0, "name"]),
      num: 1,
      packing_fee: foodItem.getIn(["specfoods", 0, "packing_fee"]),
      price: foodItem.getIn(["specfoods", 0, "price"]),
      sku_id: foodItem.getIn(["specfoods", 0, "sku_id"]),
      specs: foodItem.getIn(["specfoods", 0, "specs"]).toJS(),
      stock: foodItem.getIn(["specfoods", 0, "stock"]),
    };
  }
  return menu.map((foodCategory) => (
    <List
      header={
        <div>
          <span className="food-list-title">{foodCategory.get("name")}</span>
          <span className="food-list-title-desc">
            {foodCategory.get("description")}
          </span>
        </div>
      }
      key={foodCategory.get("id")}
    >
      {foodCategory.get("foods").map((foodItem) => (
        <List.Item key={foodItem.get("item_id")}>
          <Row>
            <Col span={6}>
              <Avatar
                src={"/img/" + foodItem.get("image_path")}
                size={60}
                shape="square"
                className="food-avatar"
              />
            </Col>
            <Col span={18}>
              <div>
                <h1>{foodItem.get("name")}</h1>
                <p className="description">{foodItem.get("description")}</p>
                <p>{foodItem.get("tips")}</p>
                {foodItem.get("activity") ? (
                  <p>
                    <span
                      style={{
                        color:
                          "#" +
                          foodItem.get("activity").get("image_text_color"),
                        borderWidth: "1px",
                        borderStyle: "solid",
                        fontSize: "12px",
                        borderRadius: "6px",
                        borderColor:
                          "#" + foodItem.get("activity").get("icon_color"),
                      }}
                    >
                      {foodItem.get("activity").get("image_text")}
                    </span>
                  </p>
                ) : null}
                <Row justify="space-between" align="middle">
                  <Col span={4}>
                    <span className="price">
                      ¥{foodItem.getIn(["specfoods", 0, "price"])}
                    </span>
                  </Col>

                  {/* listitem 右下角加入购物车区域 */}
                  <Col flex={1} className="jia-jian">
                    {
                      // 当前食物在购物车内显示减号和数量
                      shoppingCart.getIn([
                        "" + shopId,
                        "" + foodItem.get("item_id"),
                      ]) ? (
                        <span onClick={() => handleSubClick(foodItem)}>
                          <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-jianhao"></use>
                          </svg>
                          <span className="cart-cnt">
                            {shoppingCart.getIn([
                              "" + shopId,
                              "" + foodItem.get("item_id"),
                              "num",
                            ])}
                          </span>
                        </span>
                      ) : null
                    }
                    {
                      // 当前食物有分类显示'选规格", 否则显示加号
                      foodItem.get("specfoods").size === 1 ? (
                        <span
                          className="jia"
                          onClick={() =>
                            addFoodToCart(getFoodParamsFromFoodItem(foodItem))
                          }
                        >
                          <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-tianjia"></use>
                          </svg>
                        </span>
                      ) : (
                        <span
                          className="spec-span"
                          onClick={() => showSpecModal(foodItem)}
                        >
                          选规格
                        </span>
                      )
                    }
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </List.Item>
      ))}
    </List>
  ));
};

export default FoodList;
