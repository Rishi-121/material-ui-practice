import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import DataTable from "./DataTable";
import Form from "./Form";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/table" exact component={DataTable} />
      <Route path="/form" exact component={Form} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
