import React from "react";
import { Menu } from "antd";

import "./style.scss";

const MenuSider = (props) => {
  const {
    shopID,
    menu,
    shoppingCart,
    menuSelectedFoodCategoryIdx,
    menuItemRefs,
    handleMenuSiderClick,
  } = props;
  return (
    <div className="menu-sider-wrapper">
      <Menu
        mode="vertical"
        defaultSelectedKeys={["" + 0]}
        selectedKeys={["" + menuSelectedFoodCategoryIdx]}
        onClick={handleMenuSiderClick}
      >
        {menu.map((foodCategory, idx) => {
          // foodCategory => foodCategory
          return (
            <Menu.Item
              key={"" + idx}
              className={
                idx === menuSelectedFoodCategoryIdx ? "custom-selected" : ""
              }
            >
              <div>
                <span>{foodCategory.get("name")}</span>
                {/* 显示该category下在购物车中的数量 */}

                {shoppingCart.getIn([
                  "" + shopID,
                  "" + foodCategory.get("id"),
                  "num",
                ]) ? (
                  <span className="category-cnt">
                    {shoppingCart.getIn([
                      "" + shopID,
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
