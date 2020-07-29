import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import Header from "src/components/header";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Avatar,
} from "antd";

import { actionCreators as userActionCreators } from "src/page/user/store";
import UserService from "src/services/user-service.jsx";
import { _errTips } from "src/utils";

import "./style.scss";

const _user = new UserService();

class Login extends PureComponent {
  updateCaptcha = () => {
    _user.getCaptcha().then(
      (res) => {
        let data = res.data;
        if (!data.status) {
          _errTips(res.message);
        }
        this.captchaNode.src = data.code;
      },
      (err) => _errTips(err.message)
    );
  };

  handleLogin = () => {
    const { login, history } = this.props;
    login({
      username: this.username.value,
      password: this.password.value,
      captcha_code: this.captcha.value,
    })
      .then((res) => {
        history.push("/user");
      })
      .catch((err) => _errTips(err.message));
  };

  componentDidMount() {
    this.updateCaptcha();
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header
          leftContent={
            <i onClick={() => history.go(-1)}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-zuojiantou"></use>
              </svg>
            </i>
          }
          midContent="密码登录"
        />
        <div className="form-wrapper">
          <input
            type="text"
            placeholder="账号"
            ref={(node) => (this.username = node)}
          />
          <input
            type="password"
            placeholder="密码"
            ref={(node) => (this.password = node)}
          />
          <div className="captcha-wrapper">
            <input
              type="text"
              placeholder="验证码"
              ref={(node) => (this.captcha = node)}
            />
            <img
              src=""
              alt="captcha"
              ref={(node) => (this.captchaNode = node)}
            />
            <div>
              <p>看不清</p>
              <p>
                <a onClick={this.updateCaptcha}>换一张</a>
              </p>
            </div>
          </div>
          <div>
            <p>温馨提示：未注册过的账号，登录时将自动注册</p>
            <p>注册过的用户可凭账号密码登录</p>
          </div>
          <button
            className="form-button"
            type="button"
            onClick={this.handleLogin}
          >
            登录
          </button>
          <div className="reset-password">重置密码</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  login(params) {
    return dispatch(userActionCreators.login(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
