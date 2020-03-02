import React from "react";
import { ListGroup } from "react-bootstrap";

const Transactions = ({ transactions }) => {
  console.log("transactions: ", transactions);
  const sortedTransactions = transactions.sort(
    (a, b) => a.date.seconds - b.date.seconds
  );
  //console.log(transactions);
  return (
    <div>
      <ListGroup>
        {sortedTransactions &&
          sortedTransactions.map(({ date, ticker, quantity, latestPrice }) => (
            <ListGroup.Item key={date.seconds}>
              {ticker} - {quantity} shares @ {latestPrice}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default Transactions;
