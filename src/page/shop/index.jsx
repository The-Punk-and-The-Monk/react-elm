import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { actionCreators } from "./store";

import ShopHome from "./shop-home";

import "./style.scss";
import {} from "./style";

const Shop = () => {
  return (
    <Switch>
      <Route path="/shop/:id/:page" component={ShopHome} />
      <Redirect from="/shop/:id" to="/shop/:id/menu" />
      <Redirect from="/shop" to="/home" />
    </Switch>
  );
};

export default Shop;

// class Home extends PureComponent {

//   render() {
//     return (
//       <div></div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
// });

// const mapDispatchToProps = (dispatch) => ({

// });

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
