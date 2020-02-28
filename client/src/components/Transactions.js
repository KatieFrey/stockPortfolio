import React from "react";
import { ListGroup } from "react-bootstrap";

const Transactions = ({ transactions }) => {
  return (
    <div>
      <ListGroup>
        {transactions.map(transaction => (
          <ListGroup.Item key={transaction}>{transaction}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Transactions;
