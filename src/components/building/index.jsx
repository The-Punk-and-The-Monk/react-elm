import React from "react";
import { useHistory } from "react-router-dom";
import "./style.scss";

const Building = () => {
  const history = useHistory();
  return (
    <div className="building-wrapper">
      <p>建设中~~~</p>
      <a href="#" onClick={() => history.go(-1)}>
        点我放回
      </a>
    </div>
  );
};

export default Building;
