import React from "react";
import { ListGroup } from "react-bootstrap";

const Transactions = ({ transactions }) => {
  console.log(transactions);
  return (
    <div>
      <ListGroup>
        {transactions &&
          transactions.map(transaction => (
            <ListGroup.Item key={transaction.date.seconds}>
              {transaction.ticker}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default Transactions;
