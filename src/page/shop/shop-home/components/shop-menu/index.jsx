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
import "./style.scss";

class ShopMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenuIdx: 0,
      showSpecModal: false,
      foodItem: null,
      specModalSelectedFood: null,
    };
  }

  componentDidMount() {
    console.log("shopmenu mount");
    const { id } = this.props.match.params;
    const { getShopMenu } = this.props;
    getShopMenu(id);
  }

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
    const { selectedMenuIdx } = this.state;

    if (menuLoading) {
      return <Skeleton active paragraph={{ rows: 20 }} />;
    } else {
      return (
        <div className="shop-menu-wrapper">
          <Layout>
            <Layout.Sider width={100}>
              <Menu
                mode="vertical"
                defaultSelectedKeys={[selectedMenuIdx + ""]}
              >
                {menu.map((foodCategory, idx) => {
                  // foodCategory => foodCategory
                  return (
                    <Menu.Item key={idx + ""}>
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
            </Layout.Sider>
            <Layout.Content>
              <div className="food-list-wrapper">
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
              </div>
            </Layout.Content>
          </Layout>

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
  addFoodToCart(obj) {
    dispatch(shopActionCreators.addFoodToCart(obj));
  },
  decreaseFoodFromCart(obj) {
    dispatch(shopActionCreators.decreaseFoodFromCart(obj));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopMenu);
