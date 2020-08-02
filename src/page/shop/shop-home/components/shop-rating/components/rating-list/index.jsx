import React, { Fragment } from "react";
import { Rate, Skeleton, List, Comment, Avatar, Tag } from "antd";
import ListFooter from "src/components/list-footer";

const RatingList = (props) => {
  const { ratingList, hitBottomCallback } = props;
  const loading = ratingList.size === 0;

  if (loading) {
    return <Skeleton paragraph={{ rows: 4 }} active />;
  } else {
    return (
      <div className="rating-list-wrapper">
        <List
          dataSource={ratingList.toArray()}
          renderItem={(item) => (
            <List.Item>
              <Comment
                author={item.get("username")}
                avatar={<Avatar src={"/imgapi/" + item.get("avatar")} />}
                datetime={item.get("rated_at")}
                content={
                  <Fragment>
                    <div>
                      <Rate
                        disabled
                        allowHalf
                        defaultValue={item.get("rating_star")}
                      />
                    </div>
                    <p>
                      <span>{item.get("time_spent_desc")}</span>
                    </p>
                    <p>{item.get("rating_text")}</p>
                    <p>
                      {item.get("item_ratings").map((img) => {
                        return img.get("image_hash") ? (
                          <Avatar
                            shape={"square"}
                            src={"/imgapi/" + img.get("image_hash")}
                            key={img.get("food_id")}
                          />
                        ) : null;
                      })}
                    </p>
                    <p>
                      {item.get("tags").map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </p>
                  </Fragment>
                }
              />
            </List.Item>
          )}
        >
          {hitBottomCallback ? (
            <List.Item>
              <ListFooter hitBottomCallback={hitBottomCallback} />
            </List.Item>
          ) : null}
        </List>
      </div>
    );
  }
};

export default RatingList;
