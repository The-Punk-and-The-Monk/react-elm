import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as shopCategoryActionCreators } from "src/page/shop-category/store";

import ShopList from "src/components/shop-list";
import { Row, Col, Cascader, Badge, Select } from "antd";
import Avatar from "src/components/lazy-avatar";

import "./style.scss";

const { Option, OptGroup } = Select;
class OptionsCascader extends React.Component {
  constructor(props) {
    super(props);
    const { addr } = this.props;
    this.state = {
      params: {
        longitude: addr.get("longitude"),
        latitude: addr.get("latitude"),
      },
      popupAreaVisible: false,
    };

    this.orderData = [
      {
        value: 4,
        label: (
          <span>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-paixu-copy"></use>
            </svg>
            <span>智能排序</span>
          </span>
        ),
      },
      {
        value: 1,
        label: (
          <span>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-money-copy"></use>
            </svg>
            <span>起送价最低</span>
          </span>
        ),
      },
      {
        value: 2,
        label: (
          <span>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-shizhong-copy"></use>
            </svg>
            <span>配送速度最快</span>
          </span>
        ),
      },
      {
        value: 3,
        label: (
          <span>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-tubiaozhizuomoban-copy"></use>
            </svg>
            <span>评分最高</span>
          </span>
        ),
      },
      {
        value: 5,
        label: (
          <span>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-julipaixu-copy"></use>
            </svg>
            <span>距离最近</span>
          </span>
        ),
      },
      {
        value: 6,
        label: (
          <span>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-remen-copy"></use>
            </svg>
            <span>销量最高</span>
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    const {
      addr,
      allShopCategoryListLoading,
      getAllShopCategoriesList,
    } = this.props;
    if (allShopCategoryListLoading) {
      // 加载分类列表
      getAllShopCategoriesList();
    }
  }

  // 获取分类级联菜单栏的label值, 返回react node
  getLi = (imgUrl, name, count) => {
    return (
      <span className="options-cascader-li-span">
        <Avatar src={`/imgapi/${imgUrl}`} size={20} />
        <span>{name}</span>
        <Badge
          count={count}
          overflowCount={10000}
          showZero
          className="option-cascader-badge"
        />
      </span>
    );
  };

  // 递归遍历categoryList, 获取分类级联菜单的数据
  getCategoryCascaderOptions = (categoryList, curLevel) => {
    if (curLevel >= 2) {
      // 从0开始, 最多两层
      return null;
    }
    const curData = [];
    for (let category of categoryList) {
      if (!category.get("count")) {
        continue;
      }
      const cur = {};
      cur.value = category.get("id");
      cur.label = this.getLi(
        category.get("image_url"),
        category.get("name"),
        category.get("count")
      );
      if (
        category.get("sub_categories") &&
        category.get("sub_categories").size
      ) {
        cur.children = this.getCategoryCascaderOptions(
          category.get("sub_categories"),
          curLevel + 1
        );
      }
      curData.push(cur);
    }
    return curData;
  };

  // 选项改变, 更新list
  updateDisplayList = (params) => {
    const { getShopList, setShopList } = this.props;

    this.setState(
      {
        params: {
          ...this.state.params,
          ...params,
        },
      },
      () => {
        // 先置list为空数组, reducer检测到空数组也会把loading改为true
        // 注意setState有关的都不是同步的, 因为react会把几个setState合并一起更新, 但是
        // setState应该是比异步请求数据快的
        // 或者可以让set返回一个promise
        setShopList([]);
        // 再异步获取新list
        getShopList(this.state.params);
      }
    );
  };

  // 如名
  switchPopupAreaVisibility = () => {
    this.setState({
      popupAreaVisible: !this.state.popupAreaVisible,
    });
  };

  render() {
    let {
      allShopCategoryListLoading: loading,
      allShopCategoryList: list,
    } = this.props;
    let categoryData = []; // 传入分类Cascader 的options属性
    if (!loading) {
      categoryData = this.getCategoryCascaderOptions(list, 0);
    }

    return (
      <div>
        <div
          id="popuparea"
          className={this.state.popupAreaVisible ? "visible" : ""}
        />
        <div className="options-cascader-wrapper">
          <Row>
            {/* 分类 */}
            <Col span={8}>
              <Cascader
                placeholder="分类"
                disabled={loading}
                options={categoryData}
                getPopupContainer={() => document.getElementById("popuparea")}
                onPopupVisibleChange={this.switchPopupAreaVisibility}
                // 选中后,更新餐馆列表, 传入value[1], 代表第二层菜单的value
                onChange={(value) => {
                  this.updateDisplayList({ shop_category_ids: value[1] });
                }}
                //选中后更新分类级联菜单栏的内容, 由于传入的label是react node, 所以需要从中筛选出name
                displayRender={(label, selectedOptions) => {
                  if (selectedOptions.length == 0) {
                    return "";
                  }
                  return selectedOptions[selectedOptions.length - 1].label.props
                    .children[1].props.children;
                }}
                popupClassName="category-popup"
              />
            </Col>

            {/* 排序 */}
            <Col span={8}>
              <Cascader
                placeholder="排序"
                disabled={loading}
                options={this.orderData}
                getPopupContainer={() => document.getElementById("popuparea")}
                onPopupVisibleChange={this.switchPopupAreaVisibility}
                popupClassName="order-popup"
                onChange={(value) => {
                  this.updateDisplayList({ order_by: value[0] });
                }}
                displayRender={(label, selectedOptions) => {
                  if (selectedOptions.length == 0) {
                    return "";
                  }
                  return selectedOptions[0].label.props.children[1].props
                    .children;
                }}
              />
            </Col>

            {/* 筛选 */}
            <Col span={8}>
              <Select
                className="select-header"
                defaultValue={"筛选"}
                getPopupContainer={() => document.getElementById("popuparea")}
                onDropdownVisibleChange={this.switchPopupAreaVisibility}
                dropdownClassName="select-dropdown"
                dropdownAlign={{
                  points: ["tr", "br"],
                  offset: [0, 0],
                }}
                onChange={(value) => {
                  if (value === 1) {
                    // 蜂鸟专送
                    this.updateDisplayList({
                      delivery_mode: 1, // 这里有个潜在的bug, delivery_mode被设置后就一直生效. 偷个懒, 这个组件实现可能得写js TODO
                    });
                  } else {
                    // 商家属性
                    this.updateDisplayList({
                      support_ids: value, // 这里跟上面一样, 都是由于没有撤销选择的操作引起的.
                    });
                  }
                }}
              >
                <OptGroup label="配送方式">
                  <Option value={1}>蜂鸟专送</Option>
                </OptGroup>
                <OptGroup label="商家属性" title="sss" value="bbb">
                  <Option value={8}>品牌商家</Option>
                  <Option value={7}>外卖保</Option>
                  <Option value={9}>准时达</Option>
                  <Option value={5}>新店</Option>
                  <Option value={3}>在线支付</Option>
                  <Option value={4}>开发票</Option>
                </OptGroup>
              </Select>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addr: state.getIn(["location", "addr"]),
  allShopCategoryListLoading: state.getIn([
    "optionsCascader",
    "allShopCategoryListLoading",
  ]),
  allShopCategoryList: state.getIn(["optionsCascader", "allShopCategoryList"]),
});

const mapDispatchToProps = (dispatch) => ({
  getAllShopCategoriesList() {
    dispatch(actionCreators.getAllShopCategoriesList());
  },
  getShopList(params) {
    dispatch(shopCategoryActionCreators.getShopList(params));
  },
  setShopList(data) {
    dispatch(shopCategoryActionCreators.setShopList(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsCascader);
