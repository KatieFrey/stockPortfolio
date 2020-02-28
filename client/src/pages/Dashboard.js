import React from "react";

import CenteredDashboard from "../utils/styled-components/CenteredDashboard";
import DashboardTabs from "../utils/tabs/DashboardTabs";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      transactions: []
    };
  }

  componentDidMount() {
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

  getTransactions() {
    this.setState({
      transactions: [
        "Buy Apple - 6 Shares @ 300.00",
        "Buy Microsoft - 10 Shares @ 400.00",
        "Buy Disney - 100 Shares @ 1000.00",
        "Sell Weed - 20 Shares @ 50.00"
      ]
    });
  }
  render() {
    return (
      <CenteredDashboard>
        <DashboardTabs
          stocks={this.state.stocks}
          transactions={this.state.transactions}
        />
      </CenteredDashboard>
    );
  }
}

export default Dashboard;
