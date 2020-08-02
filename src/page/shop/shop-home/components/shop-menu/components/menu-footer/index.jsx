import React, { useState } from "react";
import { Drawer, List } from "antd";

import "./style.scss";

const MenuFooter = (props) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const {
    shoppingCart,
    shopId,
    addFoodToCart,
    decreaseFoodFromCart,
    emptyShopCart,
  } = props;
  const cartEmpty = shoppingCart.get("" + shopId) ? false : true;
  let priceSum = 0;
  let packingFee = 0;
  let itemCnt = 0;
  let curCart = shoppingCart.get("" + shopId);
  let items = [];
  if (!cartEmpty) {
    curCart = curCart.toJS();
    for (let key in curCart) {
      if (curCart[key].name !== undefined) {
        // 挑出是item的对象
        const item = curCart[key];
        const price = parseInt(item.price);
        const num = parseInt(item.num);
        const packing_fee = parseInt(item.packing_fee);
        items.push(item);
        priceSum += price * num;
        packingFee += packing_fee * num;
        itemCnt += num;
      }
    }
  }

  return (
    <div className="menu-footer-wrapper">
      {/* 购物车 */}
      <div
        className="shopping-cart-svg"
        onClick={() => {
          setDrawerVisible(!drawerVisible);
        }}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-gouwuche-xuanzhong"></use>
        </svg>
      </div>

      {/* 购物车右上角的角标 */}
      {cartEmpty ? null : <div className="shopping-cart-badge">{itemCnt}</div>}

      {/* 价格 */}
      {cartEmpty ? null : (
        <div className="price-sum">
          <p>
            ¥<span>{priceSum + packingFee}</span>
          </p>
          <p>
            打包费¥<span>{packingFee}</span>
          </p>
        </div>
      )}

      {/* 结算 */}
      <div className={cartEmpty ? "check-out" : "check-out active"}>去结算</div>

      {/* 点击购物车从底部划出drawer */}
      <Drawer
        title={
          <div className="drawer-title">
            <span>购物车</span>
            <span onClick={() => emptyShopCart(shopId)}>
              <span>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-lajixiang"></use>
                </svg>
              </span>
              清空
            </span>
          </div>
        }
        visible={drawerVisible}
        placement="bottom"
        zIndex={150}
        className="cart-drawer"
        onClose={() => setDrawerVisible(false)}
        closable={false}
      >
        {cartEmpty ? (
          <p>空空如也~~~~~~</p>
        ) : (
          <div className="list-wrapper">
            <List>
              {items.map((item) => (
                <List.Item key={item.itemId}>
                  <div className="list-item-wrapper">
                    <div className="left">
                      <span>{item.name}</span>-<span>{item.specs_name}</span>
                    </div>
                    <div className="right">
                      <span>¥{item.price}</span>
                      <span
                        onClick={() =>
                          decreaseFoodFromCart({ ...item, num: 1 })
                        }
                      >
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-jianhao"></use>
                        </svg>
                      </span>

                      <span className="cart-cnt">{item.num}</span>
                      <span
                        className="jia"
                        onClick={() => addFoodToCart({ ...item, num: 1 })}
                      >
                        <svg className="icon" aria-hidden="true">
                          <use xlinkHref="#icon-tianjia"></use>
                        </svg>
                      </span>
                    </div>
                  </div>
                </List.Item>
              ))}
            </List>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default MenuFooter;
