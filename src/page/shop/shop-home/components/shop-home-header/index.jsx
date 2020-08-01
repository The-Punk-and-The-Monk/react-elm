import React from "react";
import { useHistory } from "react-router-dom";

import { Row, Col, Avatar, Skeleton } from "antd";

import "./style.scss";

const ShopHomeHeader = (props) => {
  const { shop } = props;
  const shopLoading = shop.size === 0;
  const history = useHistory();
  return (
    <Skeleton
      avatar={{ size: 30 }}
      active
      loading={shopLoading}
      paragraph={{ rows: 2 }}
    >
      {!shopLoading ? (
        <div className="shop-home-header">
          <div
            className="blur-background"
            style={{
              backgroundImage: `url("${"/img/" + shop.get("image_path")}")`,
            }}
          ></div>
          <Row align="middle" gutter={10}>
            <Col span={2}>
              <div className="back-arrow" onClick={() => history.go(-1)}>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-zuojiantou"></use>
                </svg>
              </div>
            </Col>
            <Col span={4}>
              <Avatar
                src={"/img/" + shop.get("image_path")}
                className="shop-avatar"
              />
            </Col>
            <Col span={16}>
              <div>
                <h1>{shop.get("name")}</h1>
                <p>
                  <span>{shop.get("delivery_mode").get("text")}</span>/
                  <span>{shop.get("order_lead_time")}送达</span>/
                  <span>{shop.getIn(["piecewise_agent_fee", "tips"])}</span>
                </p>
                <p>
                  公告:&nbsp;<span>{shop.get("promotion_info")}</span>
                </p>
              </div>
            </Col>
            <Col span={2}>
              <div>
                <svg className="icon footer-icon" aria-hidden="true">
                  <use xlinkHref="#icon-rightarrow-white-copy"></use>
                </svg>
              </div>
            </Col>
          </Row>
          <Row align="middle" gutter={10}>
            <Col span={18}>
              {shop.get("activities").size ? (
                <p className="activities-p">
                  <span
                    className="activities-icon"
                    style={{
                      backgroundColor: `#${shop.getIn([
                        "activities",
                        0,
                        "icon_color",
                      ])}`,
                    }}
                  >
                    {shop.get("activities").get(0).get("icon_name")}
                  </span>
                  <span>{shop.getIn(["activities", 0, "description"])}</span>
                </p>
              ) : null}
            </Col>
            <Col span={4}>
              {shop.get("activities").size ? (
                <span>{shop.get("activities").size}个活动</span>
              ) : null}
            </Col>
            <Col span={2}>
              {shop.get("activities").size ? (
                <span>
                  <svg className="icon footer-icon" aria-hidden="true">
                    <use xlinkHref="#icon-rightarrow-white-copy"></use>
                  </svg>
                </span>
              ) : null}
            </Col>
          </Row>
        </div>
      ) : null}
    </Skeleton>
  );
};

export default ShopHomeHeader;
