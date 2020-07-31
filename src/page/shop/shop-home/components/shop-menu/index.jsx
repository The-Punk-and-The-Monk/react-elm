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
} from "antd";
import { connect } from "react-redux";
import { actionCreators as shopActionCreators } from "src/page/shop/store";
import FoodList from "./components/food-list";
import MenuSider from "./components/menu-sider";
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
    this.listHeaderRefs = []; // menuIdx => listheaderref
    this.menuItemRefs = []; // menuIdx => menuitemref
    this.ios = [];
    this.stickEventListening = false;
  }

  componentDidMount() {
    console.log("shopmenu mount");
    const { id } = this.props.match.params;
    const { getShopMenu } = this.props;
    getShopMenu(id);
  }

  componentDidUpdate() {
    const { menu } = this.props;
    const menuLoading = menu.size === 0;
    if (!menuLoading && !this.stickEventListening) {
      const container = document.querySelector(".food-list-wrapper");
      this.ios = observeStickySentinelChange(container);
      document.addEventListener(
        "sticky-event",
        this.handleStickyListHeaderChange
      );
      this.stickEventListening = true;
    }
  }

  compoenntWillUnmount() {
    if (this.ios.length) {
      this.ios.forEach((io) => io.disconnect());
    }
  }

  handleStickyListHeaderChange = (stickyEvent) => {
    if (stickyEvent.detail.sticky) {
      const idx = parseInt(stickyEvent.detail.target.dataset.idx);
      // console.log("fired idx", idx);

      this.setState({
        menuSelectedFoodCategoryIdx: idx,
      });
    }
  };

  showSpecModal = (foodItem) => {
    this.setState({
      showSpecModal: true,
      foodItem: foodItem,
    });
  };

  handleSpecModalOk = (e) => {
    const { addFoodToCart } = this.props;
    if (this.state.specModalSelectedFood) {
      addFoodToCart(this.state.specModalSelectedFood);
    }
  };

  handleSpecModalCancel = (e) => {
    this.setState({
      showSpecModal: false,
      foodItem: null,
      specModalSelectedFood: null,
    });
  };

  handleSpecModalRadioChange = (e) => {
    this.setState({
      specModalSelectedFood: e.target.value,
    });
  };

  render() {
    const { id: shopId } = this.props.match.params;
    const {
      menu,
      shoppingCart,
      addFoodToCart,
      decreaseFoodFromCart,
    } = this.props;
    const menuLoading = menu.size === 0;
    const { menuSelectedFoodCategoryIdx } = this.state;

    if (menuLoading) {
      return <Skeleton active paragraph={{ rows: 20 }} />;
    } else {
      return (
        <div className="shop-menu-wrapper">
          <MenuSider
            {...{
              shopId,
              menu,
              shoppingCart,
              menuSelectedFoodCategoryIdx,
            }}
          />
          <FoodList
            {...{
              shopId,
              menu,
              shoppingCart,
              addFoodToCart,
              decreaseFoodFromCart,
              showSpecModal: this.showSpecModal,
            }}
          />
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
                      shopId,
                      foodId: food.get("food_id"),
                      foodCategoryId: this.state.foodItem.get("category_id"),
                      itemId: this.state.foodItem.get("item_id"),
                      name: food.get("name"),
                      num: 1,
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
  shop: state.getIn(["shop", "shop"]),
  menu: state.getIn(["shop", "menu"]),
  shoppingCart: state.getIn(["shop", "shoppingCart"]),
});

const mapDispatchToProps = (dispatch) => ({
  getShopMenu(shopId) {
    return dispatch(shopActionCreators.getShopMenu(shopId));
  },
  addFoodToCart(params) {
    dispatch(shopActionCreators.addFoodToCart(params));
  },
  decreaseFoodFromCart(params) {
    dispatch(shopActionCreators.decreaseFoodFromCart(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopMenu);
