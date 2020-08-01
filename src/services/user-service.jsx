import axios from "axios";

export default class User {
  // 获取验证码
  getCaptcha() {
    return axios.post("/proxyapi/v1/captchas");
  }

  /**
   * params={
   *  username,
   *  password,
   *  captcha_code,
   * }
   */
  login(params) {
    return axios.post("/proxyapi/v2/login", params);
  }
}
