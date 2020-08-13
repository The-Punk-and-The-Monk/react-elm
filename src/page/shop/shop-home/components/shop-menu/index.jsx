import React from "react";
import { connect } from "react-redux";

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
} from "antd";

import { actionCreators as shopActionCreators } from "src/page/shop/store";

import FoodList from "./components/food-list";
import MenuSider from "./components/menu-sider";
import MenuFooter from "./components/menu-footer";

import observeStickySentinelChange from "./sticky-event.jsx";

import "./style.scss";

class ShopMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuSelectedFoodCategoryIdx: 0,
      showSpecModal: false,
      foodItem: null, // modal 的foodItem
      specModalSelectedFood: null,
    };
    this.listSentinelHeaderRefs = []; // menuIdx => listheaderref
    this.ios = [];
    this.stickEventListening = false;
  }

  componentDidMount() {
    console.log("shopmenu mount");
    const { shopID } = this.props;
    const { getShopMenu, menu } = this.props;
    if (!menu.size) {
      getShopMenu(shopID);
    }
  }

  componentDidUpdate() {
    const { menu } = this.props;
    const menuLoading = menu.size === 0;
    if (!menuLoading && !this.stickEventListening) {
      const container = document.querySelector(".food-list-wrapper");
      this.ios = observeStickySentinelChange(
        container,
        this.listSentinelHeaderRefs
      );
      document.addEventListener(
        "sticky-event",
        this.handleStickyListHeaderChange
      );
      this.stickEventListening = true;
    }
  }

  compoenntWillUnmount() {
    document.removeEventListener(
      "sticky-event",
      this.handleStickyListHeaderChange
    );

    if (this.ios.length) {
      try {
        this.ios.forEach((io) => io.disconnect());
      } catch (err) {}
    }
  }

  // 处理左侧菜单栏点击, 将对应list滚动到视口
  handleMenuSiderClick = ({ key }) => {
    key = parseInt(key);
    this.setState(
      {
        menuSelectedFoodCategoryIdx: key,
      },
      () => {
        this.listSentinelHeaderRefs[key].scrollIntoView({});
      }
    );

    // console.log(this.listSentinelHeaderRefs[key].scrollTo);
    // this.listSentinelHeaderRefs[key].scrollTo({
    //   left: 0,
    //   top: 0,
    //   behavior: "smooth",
    // });
    // this.listSentinelHeaderRefs[key].scrollTop = 0;
  };

  // 右侧菜单list的粘性头改变
  handleStickyListHeaderChange = (stickyEvent) => {
    if (stickyEvent.detail.sticky) {
      const idx = parseInt(stickyEvent.detail.target.dataset.idx);
      // console.log("fired idx", idx);
      this.setState({
        menuSelectedFoodCategoryIdx: idx,
      });
    }
  };

  // 显示选规格的modal
  showSpecModal = (foodItem) => {
    this.setState({
      showSpecModal: true,
      foodItem: foodItem,
    });
  };

  // modal中点击加入购物车
  handleSpecModalOk = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { addFoodToCart } = this.props;
    if (this.state.specModalSelectedFood) {
      addFoodToCart(this.state.specModalSelectedFood);
    }
  };

  // 退出modal
  handleSpecModalCancel = (e) => {
    this.setState({
      showSpecModal: false,
      foodItem: null,
      specModalSelectedFood: null,
    });
  };

  // modal中选中的项目改变
  handleSpecModalRadioChange = (e) => {
    this.setState({
      specModalSelectedFood: e.target.value,
    });
  };

  render() {
    const { shopID } = this.props;
    const {
      menu,
      shoppingCart,
      addFoodToCart,
      decreaseFoodFromCart,
      emptyShopCart,
    } = this.props;
    const menuLoading = menu.size === 0;
    const { menuSelectedFoodCategoryIdx } = this.state;

    if (menuLoading) {
      return <Skeleton active paragraph={{ rows: 5 }} />;
    } else {
      return (
        <div className="shop-menu-wrapper">
          <MenuSider
            {...{
              shopID,
              menu,
              shoppingCart,
              menuSelectedFoodCategoryIdx,
              handleMenuSiderClick: this.handleMenuSiderClick,
            }}
          />
          <FoodList
            {...{
              shopID,
              menu,
              shoppingCart,
              addFoodToCart,
              decreaseFoodFromCart,
              showSpecModal: this.showSpecModal,
            }}
          />
          <MenuFooter
            {...{
              shopID,
              shoppingCart,
              addFoodToCart,
              decreaseFoodFromCart,
              emptyShopCart,
            }}
          />
          {/* 选规格的modal */}
          <div id="spec-modal-container"></div>
          {this.state.showSpecModal ? (
            <Modal
              title={this.state.foodItem.get("name")}
              visible={this.state.showSpecModal}
              onOk={this.handleSpecModalOk}
              onCancel={this.handleSpecModalCancel}
              okText="加入购物车"
              getContainer="#spec-modal-container"
            >
              <p>规格</p>
              <Radio.Group onChange={this.handleSpecModalRadioChange}>
                {this.state.foodItem.get("specfoods").map((food, index) => (
                  <Radio.Button
                    key={food.get("food_id")}
                    value={{
                      shopID,
                      foodId: food.get("food_id"),
                      foodCategoryId: this.state.foodItem.get("category_id"),
                      itemId: this.state.foodItem.get("item_id"),
                      name: food.get("name"),
                      num: 1,
                      specs_name: food.get("specs_name"),
                      packing_fee: food.get("packing_fee"),
                      price: food.get("price"),
                      sku_id: food.get("sku_id"),
                      specs: food.get("specs").toJS(),
                      stock: food.get("stock"),
                    }}
                    onChange={this.handleSpecModalRadioChange}
                  >
                    {food.get("specs_name")}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Modal>
          ) : null}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  // shop: state.getIn(["shop", "shop"]),
  menu: state.getIn(["shop", "menu"]),
  shoppingCart: state.getIn(["shop", "shoppingCart"]),
});

const mapDispatchToProps = (dispatch) => ({
  getShopMenu(shopID) {
    return dispatch(shopActionCreators.getShopMenu(shopID));
  },
  addFoodToCart(params) {
    dispatch(shopActionCreators.addFoodToCart(params));
  },
  decreaseFoodFromCart(params) {
    dispatch(shopActionCreators.decreaseFoodFromCart(params));
  },
  emptyShopCart(shopID) {
    dispatch(shopActionCreators.emptyShopCart(shopID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopMenu);
