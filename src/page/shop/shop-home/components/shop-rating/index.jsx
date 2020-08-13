import React from "react";
import { connect } from "react-redux";

import { Rate } from "antd";

import { actionCreators as shopActionCreators } from "src/page/shop/store";
import RatingScores from "./components/rating-scores";
import RatingTags from "./components/rating-tags";
import RatingList from "./components/rating-list";
import "./style.scss";

class ShopRatings extends React.PureComponent {
  componentDidMount() {
    console.log("shoprating mount");
    const { shopID } = this.props;
    const {
      ratingScores,
      ratingTags,
      ratingList,
      getRatingList,
      getRatingTags,
      getRatingScores,
    } = this.props;
    if (!ratingScores.size) {
      getRatingScores(shopID);
    }
    if (!ratingTags.size) {
      getRatingTags(shopID);
    }
    if (!ratingList.size) {
      getRatingList({
        shopID,
      });
    }
  }

  loadMoreRatings = () => {
    const { shopID } = this.props;
    const { getRatingList, ratingList } = this.props;
    getRatingList({
      shopID,
      offset: ratingList.size,
    });
  };

  render() {
    const { ratingScores, ratingTags, ratingList, getRatingList } = this.props;

    return (
      <div className="shop-rating-wrapper">
        <RatingScores ratingScores={ratingScores} />
        <RatingTags ratingTags={ratingTags} />
        <RatingList
          ratingList={ratingList}
          hitBottomCallback={this.loadMoreRatings}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ratingScores: state.getIn(["shop", "ratingScores"]),
  ratingTags: state.getIn(["shop", "ratingTags"]),
  ratingList: state.getIn(["shop", "ratingList"]),
});

const mapDispatchToProps = (dispatch) => ({
  getRatingScores(shopID) {
    dispatch(shopActionCreators.getRatingScores(shopID));
  },
  getRatingTags(shopID) {
    dispatch(shopActionCreators.getRatingTags(shopID));
  },
  getRatingList(params) {
    dispatch(shopActionCreators.getRatingList(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopRatings);
