import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Portfolio from "../../components/Portfolio";
import Transactions from "../../components/Transactions";
import Buy from "../../components/Buy";

import quote from "../../utils/getQuoteEXI";

class DashboardTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      colors: null,
      todaysPrices: null
    };
  }

  // componentDidMount() {
  //   console.log("I'm in componentDidMount of  ******** Dash board tabs");
  //   this.getTodaysQuote();
  // }

  // getTodaysQuote = async () => {
  //   let today = {};
  //   let colors = {};

  //   console.log("****** get todays quote props: ", this.props.portfolio);

  //   await this.props.portfolio.map(async ({ ticker, latestPrice }) => {
  //     console.log("get todays quote ticker: ", ticker);
  //     const quoteData = await quote(ticker);
  //     console.log("Portfolio quote data: ", quoteData);

  //     today[ticker] = [quoteData.open || latestPrice, quoteData.latestPrice];

  //     if (today[ticker][0] > today[ticker][1]) {
  //       colors[ticker] = "red";
  //     } else if (today[ticker][0] < today[ticker][1]) {
  //       colors[ticker] = "green";
  //     } else {
  //       colors[ticker] = "gray";
  //     }
  //   });
  //   console.log("Colors: ", colors);

  //   this.setState(state => {
  //     return { colors: colors, todaysPrices: today };
  //   });
  //   //
  //   console.log("Dashboard Tabs state: ", this.state);
  // };

  render() {
    const {
      portfolio,
      transactions,
      currentUser,
      quoteData,
      handleChange
    } = this.props;
    console.log("Portfolio in tabs: ", portfolio);
    return (
      <Tabs
        onClick={this.getTodaysQuote}
        defaultActiveKey="buy"
        id="uncontrolled-tab-example"
      >
        <Tab eventKey="portfolio" title="Portfolio">
          <Portfolio portfolio={portfolio} quoteData={quoteData} />
        </Tab>
        <Tab eventKey="transactions" title="Transactions">
          <Transactions transactions={transactions} />
        </Tab>
        <Tab eventKey="buy" title="Buy">
          <Buy currentUser={currentUser} handle={handleChange} />
        </Tab>
      </Tabs>
    );
  }
}

export default DashboardTabs;
