import React from "react";

import CenteredDashboard from "../utils/styled-components/CenteredDashboard";
import DashboardTabs from "../utils/tabs/DashboardTabs";

import { auth, firestore } from "../firebase/firebase.utils";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      transactions: [],
      currentUser: null
    };
  }

  componentDidMount() {
    this.setCurrentUser(this.props.currentUser);
    this.getStocks();
    this.getTransactions();
  }

  getStocks() {
    this.setState({
      stocks: [
        "Apple",
        "Microsoft",
        "Tesla",
        "Google",
        "Weed",
        "Netflix",
        "Disney"
      ]
    });
  }

  getTransactions = async () => {
    const transactionArr = [];
    const { currentUser } = this.props;
    console.log("Dashboard current user: ", currentUser.uid);
    await firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("transactions")
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          console.log(doc.id, doc.data());
          transactionArr.push(doc.data());
        });
      });
    //console.log("Transaction Array: ", transactionArr);
    this.setState({
      transactions: this.state.transactions.concat(transactionArr)
    });
    console.log("Dashboard transactions: ", this.state.transactions);
  };

  setCurrentUser = async user => {
    await this.setState({ currentUser: user });
  };

  render() {
    const { currentUser } = this.state;
    return (
      <CenteredDashboard>
        <DashboardTabs
          stocks={this.state.stocks}
          transactions={this.state.transactions}
          currentUser={currentUser}
        />
      </CenteredDashboard>
    );
  }
}

export default Dashboard;
