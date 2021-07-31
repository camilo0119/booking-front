import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";
import NavBar from "../ui/NavBar";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  navBar = true,
  ...rest
}) => {
  return (
    <>
      {navBar && <NavBar />}
      <Route
        {...rest}
        component={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
      />
    </>
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
