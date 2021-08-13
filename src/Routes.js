import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import DataTable from "./DataTable";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/table" exact component={DataTable} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
