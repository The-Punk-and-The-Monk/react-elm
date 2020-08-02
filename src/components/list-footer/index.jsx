/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-08-02 17:47:53
 * @LastEditTime: 2020-08-02 18:52:44
 * @FilePath: /react-elm/src/components/list-footer/index.jsx
 * @Description: 用在list后面, 用来判断list到底了没有, 到底了就调用hitBottomCallback
 */

import React from "react";
import { Spin } from "antd";
import "./style.scss";

export default class ListFooter extends React.PureComponent {
  componentDidMount() {
    const { hitBottomCallback } = this.props;
    this.io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          hitBottomCallback();
        }
      },
      {
        threshold: [0],
      }
    );
    this.io.observe(document.querySelector(".list-footer"));
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
      <div className="list-footer">
        <Spin />
      </div>
    );
  }
}
