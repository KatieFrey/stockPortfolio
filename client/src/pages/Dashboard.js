import React from "react";

import CenteredDashboard from "../utils/styled-components/CenteredDashboard";
import DashboardTabs from "../utils/tabs/DashboardTabs";

import { auth, firestore } from "../firebase/firebase.utils";

import {
  getPortfolio,
  getTransactions,
  getTodaysQuote,
  getCurrentUserData
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
    if (this.props && this.props.currentUser) {
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

      // if(this.props && this.props.currentUser){
      //   const currentUser = await getCurrentUserData(this.props.currentUser)
      // }
    }
  }

  render() {
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
