import React from "react";
import { Route, Switch } from "react-router-dom";
import {Categories} from '../Categories/Categories'
import {AboutUsMain} from '../AboutUsMain/AboutUsMain'

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

        {/* <Route exact path="/secret">
          {loggedIn ? <Redirect to="/" /> : <div>Секретная страничка</div>}
        </Route> */}
      </Switch>
    </>
  );
};
