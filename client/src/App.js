import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import Transactions from "./pages/Transactions";

import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/transactions" component={Transactions}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/register" component={Register}></Route>
        </Switch>
      </Router>
    );
  }
}
