/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 19:18:11
 * @LastEditTime: 2020-08-01 17:21:35
 * @FilePath: /react-elm/src/App.jsx
 * @Description: entry
 */
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Home from "src/page/home/loadable.jsx";
import ShopCategory from "src/page/shop-category/loadable.jsx";
import LocalStorageLoader from "./components/localstorage-loader";
import Location from "./page/location/loadable.jsx";
import Search from "./page/search/loadable.jsx";
import User from "./page/user/loadable.jsx";
import Shop from "./page/shop/loadable.jsx";

import "./reset.css";
import "antd/dist/antd.css";

const App = () => (
  <Fragment>
    <LocalStorageLoader />
    <Switch>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/shop-category/:title/:id">
        <ShopCategory />
      </Route>
      <Route path="/shop" component={Shop} />
      <Redirect from="/shop-category" to="/home" />
      <Route path="/location">
        <Location />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/user" component={User} />
      <Redirect exact from="/" to="/home" />
    </Switch>
  </Fragment>
);

ReactDOM.render(
  <Fragment>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </Fragment>,
  document.getElementById("root")
);
