import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import Portfolio from "../../components/Portfolio";
import Transactions from "../../components/Transactions";
import Buy from "../../components/Buy";

const DashboardTabs = ({ stocks, transactions, currentUser }) => {
  return (
    <Tabs defaultActiveKey="portfolio" id="uncontrolled-tab-example">
      <Tab eventKey="portfolio" title="Portfolio">
        <Portfolio stocks={stocks} />
      </Tab>
      <Tab eventKey="transactions" title="Transactions">
        <Transactions transactions={transactions} />
      </Tab>
      <Tab eventKey="buy" title="Buy">
        <Buy stocks={stocks} currentUser={currentUser} />
      </Tab>
    </Tabs>
  );
};

export default DashboardTabs;
