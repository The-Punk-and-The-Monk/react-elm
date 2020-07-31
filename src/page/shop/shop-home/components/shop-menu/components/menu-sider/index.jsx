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
import "./style.scss";

const MenuSider = (props) => {
  const {
    shopId,
    menu,
    shoppingCart,
    menuSelectedFoodCategoryIdx,
    menuItemRefs,
  } = props;
  return (
    <div className="menu-sider-wrapper">
      <Menu
        mode="vertical"
        defaultSelectedKeys={["" + 0]}
        selectedKeys={["" + menuSelectedFoodCategoryIdx]}
      >
        {menu.map((foodCategory, idx) => {
          // foodCategory => foodCategory
          return (
            <Menu.Item key={"" + idx}>
              <div>
                <span>{foodCategory.get("name")}</span>
                {/* 显示该category下在购物车中的数量 */}

                {shoppingCart.getIn([
                  "" + shopId,
                  "" + foodCategory.get("id"),
                  "num",
                ]) ? (
                  <span className="category-cnt">
                    {shoppingCart.getIn([
                      "" + shopId,
                      "" + foodCategory.get("id"),
                      "num",
                    ])}
                  </span>
                ) : null}
              </div>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default MenuSider;
