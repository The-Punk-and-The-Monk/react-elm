import React from "react";
import { Spin } from "antd";
import "./style.scss";
export default function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="spin-wrapper">
        <Spin />
      </div>
    </div>
  );
}
