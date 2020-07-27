import React, { PureComponent, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./store";
import { Route, Switch, Redirect } from "react-router-dom";
import ChooseCity from "./chooseCity/loadable.jsx";
import ChooseAddr from "./chooseAddr/loadable.jsx";

const Location = () => {
  return (
    <Switch>
      <Route path="/location/city">
        <ChooseCity />
      </Route>
      <Route path="/location/addr">
        <ChooseAddr />
      </Route>
      <Redirect exact from="/location" to="/location/city" />
    </Switch>
  );
};

export default Location;
