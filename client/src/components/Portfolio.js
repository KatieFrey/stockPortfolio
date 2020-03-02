import React from "react";
import { ListGroup } from "react-bootstrap";

const Portfolio = props => {
  // const { today, colors, portfolio } = props;
  // console.log("Portfolio props: -------->", props.portfolio);
  // const tickerApple = props.portfolio[0].ticker;
  // console.log("Colors props: -------->", props.quoteData.colors[tickerApple]);
  // console.log("Today props: -------->", props.quoteData.today);

  return (
    <div>
      <ListGroup>
        {props.quoteData &&
          props.portfolio.map(curr => (
            <ListGroup.Item
              style={{ color: props.quoteData.colors[curr.ticker] }}
              key={curr.latestPrice}
            >
              {curr.ticker} - {curr.quantity} shares - $
              {props.quoteData.today[curr.ticker][1]}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default Portfolio;
// style={{ color: colors[ticker] }}
//(curr.quantity * props.today[curr.ticker][1]).toFixed(2)
