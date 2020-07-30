/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 19:18:11
 * @LastEditTime: 2020-07-30 10:58:46
 * @FilePath: /react-elm/src/App.jsx
 * @Description: entry
 */
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import store from "./store";
import Home from "src/page/home/loadable.jsx";
import ShopCategory from "src/page/shop-category";
import LocalStorageLoader from "./components/localstorage-loader";
import Location from "./page/location";
import Search from "./page/search";
import User from "./page/user";
import Shop from "./page/shop";

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
