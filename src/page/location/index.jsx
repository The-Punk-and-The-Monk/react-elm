import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import ChooseCity from "./chooseCity";
import ChooseAddr from "./chooseAddr";

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
