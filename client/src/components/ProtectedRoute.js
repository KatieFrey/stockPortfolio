import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                prevLocation: path,
                error: "You need to sign in first!"
              }
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
