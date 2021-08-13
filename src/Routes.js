import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
