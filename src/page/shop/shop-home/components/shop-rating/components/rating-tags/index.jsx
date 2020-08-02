import React from "react";
import { Tag, Skeleton } from "antd";
import "./style.scss";
const RatingTags = (props) => {
  const { ratingTags } = props;
  const loading = ratingTags.size === 0;

  if (loading) {
    return <Skeleton paragraph={{ rows: 4 }} active />;
  } else {
    return (
      <div className="rating-tags-wrapper">
        {ratingTags.map((tag) => (
          <Tag
            key={tag.get("name")}
            color={tag.get("unsatisfied") ? "default" : "blue"}
          >
            {tag.get("name") + "(" + tag.get("count") + ")"}
          </Tag>
        ))}
      </div>
    );
  }
};

export default RatingTags;
