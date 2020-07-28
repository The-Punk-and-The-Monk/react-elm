import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { actionCreators as foodCategoryActionCreators } from "src/page/food-category/store";

import RestaurantList from "src/components/restaurant-list";
import { Row, Col, Cascader, Avatar, Badge } from "antd";
import "./style.scss";

class OptionsCascader extends PureComponent {
  componentDidMount() {
    const {
      addr,
      allRestaurantCategoryListLoading,
      getAllRestaurantCategoriesList,
    } = this.props;
    if (allRestaurantCategoryListLoading) {
      // 加载分类列表
      getAllRestaurantCategoriesList();
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

  updateDisplayList = (params) => {
    const { addr, getRestaurantList, setRestaurantList } = this.props;

    // 先置list为空数组, reducer检测到空数组也会把loading改为true
    setRestaurantList([]);
    // 再异步获取新list
    getRestaurantList({
      longitude: addr.get("longitude"),
      latitude: addr.get("latitude"),
      ...params,
    });
  };

  render() {
    let {
      allRestaurantCategoryListLoading: loading,
      allRestaurantCategoryList: list,
    } = this.props;
    const data = []; // 传入Cascader 的options属性
    if (!loading) {
      for (let level1 of list) {
        const cur = {};
        if (!level1.get("count")) {
          continue;
        }
        cur.value = level1.get("id");
        cur.label = this.getLi(
          level1.get("image_url"),
          level1.get("name"),
          level1.get("count")
        );
        if (level1.size) {
          cur.children = [];
          const sub_categories = level1.get("sub_categories");
          for (let level2 of sub_categories) {
            if (!level2.get("count")) {
              continue;
            }
            const cur2 = {};
            cur2.value = level2.get("id");
            cur2.label = this.getLi(
              level2.get("image_url"),
              level2.get("name"),
              level2.get("count")
            );
            cur.children.push(cur2);
          }
        }
        data.push(cur);
      }
    }
    return (
      <div>
        <div id="popuparea" />
        <div className="options-cascader-wrapper">
          <Row>
            <Col span={8}>
              <Cascader
                placeholder="分类"
                disabled={loading}
                options={data}
                getPopupContainer={() => document.getElementById("popuparea")}
                // 选中后,更新餐馆列表, 传入value[1], 代表第二层菜单的value
                onChange={(value) => {
                  this.updateDisplayList({ restaurant_category_id: value[1] });
                }}
                //选中后更新分类级联菜单栏的内容, 由于传入的label是react node, 所以需要从中筛选出name
                displayRender={(label, selectedOptions) => {
                  if (selectedOptions.length == 0) {
                    return "";
                  }
                  return selectedOptions[selectedOptions.length - 1].label.props
                    .children[1].props.children;
                }}
              />
            </Col>
            <Col span={8}>
              <Cascader placeholder="排序" disabled={loading} />
            </Col>
            <Col span={8}>
              <Cascader placeholder="筛选" disabled={loading} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addr: state.getIn(["location", "addr"]),
  allRestaurantCategoryListLoading: state.getIn([
    "optionsCascader",
    "allRestaurantCategoryListLoading",
  ]),
  allRestaurantCategoryList: state.getIn([
    "optionsCascader",
    "allRestaurantCategoryList",
  ]),
});

const mapDispatchToProps = (dispatch) => ({
  getAllRestaurantCategoriesList() {
    dispatch(actionCreators.getAllRestaurantCategoriesList());
  },
  getRestaurantList(params) {
    dispatch(foodCategoryActionCreators.getRestaurantList(params));
  },
  setRestaurantList(data) {
    dispatch(foodCategoryActionCreators.setRestaurantList(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsCascader);
