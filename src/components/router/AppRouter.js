import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { startCheckin } from "../../actions/auth";
import ApartmentRegister from "../administration/apartments/ApartmentRegister";
import SeasonRegister from "../administration/seasons/SeasonRegister";
import { LoginScreen } from "../auth/LoginScreen";
import AppContainer from "../container/AppContainer";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch()
  const {checking, uid} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(startCheckin())
  }, [dispatch])

  if (checking) {
    return (
      <h5>Espere...</h5>
    )
  }

  return (
    <Router>
        <div>
            <Switch>

                <PublicRoute 
                    exact 
                    path="/login" 
                    component={ LoginScreen }
                    isAuthenticated={ !!uid }
                />

                <PrivateRoute 
                    exact 
                    path="/" 
                    component={ AppContainer }
                    isAuthenticated={ !!uid }
                />
                
                <PrivateRoute 
                    exact 
                    path="/apartment-register"
                    component={ApartmentRegister} 
                    isAuthenticated={ !!uid }
                />
                
                <PrivateRoute 
                    exact 
                    path="/season-register"
                    component={SeasonRegister} 
                    isAuthenticated={ !!uid }
                />

                <Redirect to="/" />   
            </Switch>
        </div>
    </Router>
  );
};
