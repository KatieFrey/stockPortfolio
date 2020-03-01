import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import Transactions from "./pages/Transactions";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  //We need to close subscriptions when this unmounts - prevent memory leaks

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        //Remember createUserProfileDocument returns the userReference
        const userRef = await createUserProfileDocument(userAuth);

        //You can acquire the user data in firestore off of the .onSnapshot method
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      //Else set currentUser to null
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    //close subscription
    this.unsubscribeFromAuth();
  }
  render() {
    let { currentUser } = this.state;
    return (
      <Router>
        <Switch>
          <Layout currentUser={currentUser}>
            <Route
              exact
              path="/"
              loggedIn={currentUser}
              component={Signin}
            ></Route>
            <ProtectedRoute
              exact
              path="/dashboard"
              loggedIn={currentUser}
              component={Dashboard}
            />
            <Route path="/register" component={Register}></Route>
          </Layout>
        </Switch>
      </Router>
    );
  }
}
