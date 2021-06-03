import React from "react";
import { Route, Switch } from "react-router-dom";
import { Categories } from "../Categories/Categories";
import { AboutUsMain } from "../AboutUsMain/AboutUsMain";
import { Login } from "../Login";
import { Signup } from "../SignUp";
import Profile from "../Profile/Profile";

export const Main = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <AboutUsMain />
        </Route>
        <Route exact path="/categories/:category">
          <Categories />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        {/* <Route exact path="/secret">
          {loggedIn ? <Redirect to="/" /> : <div>Секретная страничка</div>}
        </Route> */}
      </Switch>
    </>
  );
};