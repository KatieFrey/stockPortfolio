import React from "react";
import { ListGroup } from "react-bootstrap";

const Portfolio = ({ stocks }) => {
  return (
    <div>
      <ListGroup>
        {stocks.map(stock => (
          <ListGroup.Item key={stock}>{stock}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Portfolio;
