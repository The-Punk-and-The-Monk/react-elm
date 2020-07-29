import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Login from "./login";
import UserHome from "./user-home";
import { actionCreators } from "./store";

import "./style.scss";
import {} from "./style";

// const Home = () => {
//   return (
//     <div>aaaa</div>
//   );
// };

// export default Home

class User extends PureComponent {
  render() {
    const { path } = this.props.match;
    return (
      <Switch>
        <Route path={`${path}/login`} component={Login} />
        <Route path={`${path}`} component={UserHome} />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(User);
