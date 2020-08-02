import React from "react";
import { Rate, Skeleton } from "antd";
import "./style.scss";

const RatingScores = (props) => {
  const { ratingScores } = props;
  const loading = ratingScores.size === 0;

  if (loading) {
    return <Skeleton paragraph={{ rows: 4 }} active />;
  } else {
    return (
      <div className="rating-scores-wrapper">
        <div className="left">
          <h1>{ratingScores.get("overall_score").toFixed(2)}</h1>
          <p>综合评价</p>
          <p>高于周边商家{ratingScores.get("compare_rating") * 100}%</p>
        </div>
        <div className="right">
          <div>
            <span>服务态度</span>
            <span>
              <Rate
                disabled
                allowHalf
                defaultValue={ratingScores.get("service_score")}
              ></Rate>
            </span>
            <span>{ratingScores.get("service_score").toFixed(2)}</span>
          </div>
          <div>
            <span>菜品评价</span>
            <span>
              <Rate
                disabled
                allowHalf
                defaultValue={ratingScores.get("food_score")}
              ></Rate>
            </span>
            <span>{ratingScores.get("food_score").toFixed(2)}</span>
          </div>
          <p>
            <span>送达时间</span>
            <span>{ratingScores.get("deliver_time")}分钟</span>
          </p>
        </div>
      </div>
    );
  }
};

export default RatingScores;
