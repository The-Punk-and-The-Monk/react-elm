import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "src/components/header";
import Footer from "src/components/footer";
import { Avatar, Row, Col, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./style.scss";

class UserHome extends PureComponent {
  constructor(props) {
    super(props);
    this.listData = [
      {
        title: "我的订单",
        avatar: (
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-list"></use>
          </svg>
        ),
        href: "/home",
      },
      {
        title: "积分商城",
        avatar: (
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-jifenshangcheng"></use>
          </svg>
        ),
        href: "/home",
      },
      {
        title: "饿了么会员卡",
        avatar: (
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-huiyuan"></use>
          </svg>
        ),
        href: "/home",
      },
      {
        title: "服务中心",
        avatar: (
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-fuwuzhongxin"></use>
          </svg>
        ),
        href: "/home",
      },
      {
        title: "下载饿了么APP",
        avatar: (
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-elema-blue"></use>
          </svg>
        ),
        href: "/home",
      },
    ];
  }
  render() {
    const { history, user } = this.props;
    const logined = user.get("user_id") ? true : false;

    return (
      <div className="user-home-wrapper">
        <Header
          leftContent={
            <i onClick={() => history.go(-1)}>
              {" "}
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-zuojiantou"></use>
              </svg>
            </i>
          }
          midContent="我的"
        />

        <Link className="main-wrapper" to="/user/login">
          <div className="username-info-wrapper">
            <Avatar
              size={80}
              icon={<UserOutlined />}
              src={logined ? "/proxyapi/img/" + user.get("avatar") : ""}
            />
            <div>
              <p>{logined ? user.get("username") : "登录|注册"}</p>
              <p>
                {logined
                  ? user.get("mobile")
                    ? user.get("mobile")
                    : "暂无绑定手机号"
                  : "暂无绑定手机号"}
              </p>
            </div>
          </div>
          <div>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-rightarrow-white-copy"></use>
            </svg>
          </div>
        </Link>

        <Row className="pocket-wrapper">
          <Col span={8}>
            <div>
              <p>
                <span>{logined ? user.get("balance").toFixed(2) : "0.00"}</span>
                元
              </p>
              <p>我的余额</p>
            </div>
          </Col>
          <Col span={8} className="mid-col">
            <div>
              <p>
                <span>{logined ? user.get("gift_amount") : 0}</span>个
              </p>
              <p>我的优惠</p>
            </div>
          </Col>
          <Col span={8}>
            <div>
              <p>
                <span>{logined ? user.get("point") : 0}</span>分
              </p>
              <p>我的积分</p>
            </div>
          </Col>
        </Row>

        <div className="list-wrapper">
          <List
            itemLayout="horizontal"
            dataSource={this.listData}
            renderItem={(item) => (
              <Link to={item.href}>
                <List.Item
                  extra={
                    <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#icon-rightarrow"></use>
                    </svg>
                  }
                >
                  <List.Item.Meta avatar={item.avatar} title={item.title} />
                </List.Item>
              </Link>
            )}
          ></List>
        </div>

        <Footer selectedTab="userTab" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.getIn(["user", "user"]),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
