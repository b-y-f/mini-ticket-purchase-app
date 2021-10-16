/* eslint-disable react/jsx-props-no-spreading */
import { Route, Redirect } from "react-router-dom";
import React from "react";

export default function PrivateRoute({ children, currentUser, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
