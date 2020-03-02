import React from "react";

import CenteredDashboard from "../utils/styled-components/CenteredDashboard";
import DashboardTabs from "../utils/tabs/DashboardTabs";

import { firestore } from "../firebase/firebase.utils";

import {
  getPortfolio,
  getTransactions,
  getTodaysQuote
} from "../utils/webUtils";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [],
      transactions: [],
      currentUser: null,
      quoteData: null
    };
  }

  async componentDidMount() {
    // console.log("Component did mount of Dashboard ??????????");
    // this.setCurrentUser(this.props.currentUser);
    // this.getStocks();
    // this.getTransactions();
    console.log("CurrentUser props - ", this.props.currentUser);
    const portfolio = await getPortfolio(this.props.currentUser);
    console.log("portfolio - ", portfolio);
    const transactions = await getTransactions(this.props.currentUser);
    //console.log("transactions - ", transactions);
    const quoteData = await getTodaysQuote(portfolio);
    console.log("quoteData - ", quoteData);

    this.setState({
      portfolio: portfolio,
      transactions: transactions,
      currentUser: this.props.currentUser,
      quoteData: quoteData
    });
    console.log("Component did mount state: ", this.state);
  }

  // getStocks = async () => {
  //   const portfolioArr = [];
  //   const { currentUser } = this.props;
  //   await firestore
  //     .collection("users")
  //     .doc(currentUser.uid)
  //     .collection("portfolio")
  //     .get()
  //     .then(querySnapShot => {
  //       querySnapShot.forEach(doc => {
  //         //console.log(doc.id, doc.data());
  //         portfolioArr.push(doc.data());
  //       });
  //     });
  //   //console.log("Transaction Array: ", transactionArr);
  //   this.setState({
  //     portfolio: this.state.portfolio.concat(portfolioArr)
  //   });
  //   console.log("Dashboard portfolio: ", this.state.portfolio);
  // };

  // getTransactions = async () => {
  //   const transactionArr = [];
  //   const { currentUser } = this.props;

  //   await firestore
  //     .collection("users")
  //     .doc(currentUser.uid)
  //     .collection("transactions")
  //     .get()
  //     .then(querySnapShot => {
  //       querySnapShot.forEach(doc => {
  //         //console.log(doc.id, doc.data());
  //         transactionArr.push(doc.data());
  //       });
  //     });
  //   //console.log("Transaction Array: ", transactionArr);
  //   this.setState({
  //     transactions: this.state.transactions.concat(transactionArr)
  //   });
  //   //console.log("Dashboard transactions: ", this.state.transactions);
  // };

  // setCurrentUser = async user => {
  //   await this.setState({ currentUser: user });
  // };

  render() {
    //const { currentUser, portfolio, transactions } = this.state;
    //console.log("Dashboard Portfolio in render: ", portfolio);
    return (
      <CenteredDashboard>
        {this.state &&
        this.state.portfolio &&
        this.state.transactions &&
        this.state.currentUser ? (
          <DashboardTabs
            portfolio={this.state.portfolio}
            transactions={this.state.transactions}
            currentUser={this.state.currentUser}
            quoteData={this.state.quoteData}
          />
        ) : null}
      </CenteredDashboard>
    );
  }
}
export default Dashboard;
