import React from "react";
import renderMergedProps from "../utils/renderMergedProps";
import { Route } from "react-router-dom";

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

export default PropsRoute;
