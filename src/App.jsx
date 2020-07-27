/*
 * @Author: LinFeng
 * @LastEditors: LinFeng
 * @Date: 2020-07-24 19:18:11
 * @LastEditTime: 2020-07-27 19:59:41
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
import Footer from "./components/footer";
import Location from "./page/location";

const App = () => (
  <Fragment>
    <Switch>
      <Route path="/location">
        <Location />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
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
