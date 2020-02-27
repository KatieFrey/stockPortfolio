import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
