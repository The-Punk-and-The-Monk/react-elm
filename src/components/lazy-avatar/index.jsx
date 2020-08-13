/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-08-02 17:47:53
 * @LastEditTime: 2020-08-13 13:23:49
 * @FilePath: /react-elm/src/components/lazy-avatar/index.jsx
 * @Description: 用在list后面, 用来判断list到底了没有, 到底了就调用hitBottomCallback
 */

import React from "react";
import { Avatar } from "antd";

import "./style.scss";

export default class LazyAvatar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.uuid = Math.uuidFast();
  }
  componentDidMount() {
    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          this.setState({
            show: true,
          });
          this.io.disconnect();
        }
      },
      {
        threshold: [0],
      }
    );
    this.io.observe(document.querySelector(`.avatar-${this.uuid}`));
  }
  componentWillUnmount() {
    if (this.io) {
      try {
        this.io.disconnect();
      } catch (e) {}
    }
  }

  render() {
    return (
      <div className="lazy-avatar-wrapper">
        <div className={`avatar-${this.uuid}`}>
          {this.state.show ? (
            <Avatar {...this.props} />
          ) : (
            <Avatar {...this.props} src="" />
          )}
        </div>
      </div>
    );
  }
}
