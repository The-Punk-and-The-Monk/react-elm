import React from "react";
import { withRouter } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "src/components/loading";

const LoadableComponent = Loadable({
  loader: () => import("./"),
  loading: Loading,
});

export default () => <LoadableComponent />;
