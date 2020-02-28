import React from "react";
import {
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
  Button,
  Form
} from "react-bootstrap";

class Buy extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ticker: "",
      quantity: 0,
      balance: 0
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleTicker = event => {
    this.setState({
      ticker: event.target.name
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    //create Transaction instance
    //update portfolio list
    //update transaction list
    console.log("Submit: ", this.state);
  };

  render() {
    let { stocks } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <br />
          <h2>Your balance is ${this.state.balance}</h2>
          <br />
          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title="Ticker Symbol"
              id="input-group-dropdown-1"
              name="ticker"
            >
              {stocks.map(stock => (
                <Dropdown.Item
                  name={stock}
                  onClick={this.handleTicker}
                  value={stock}
                  key={stock}
                >
                  {stock}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <FormControl
              aria-describedby="basic-addon1"
              name="ticker"
              value={this.state.ticker}
            />
          </InputGroup>
          <br />
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Number of Shares</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={this.handleChange}
              name="quantity"
              value={this.state.quantity}
              placeholder="Amount"
              aria-label="Amount (to the nearest dollar)"
            />
            <InputGroup.Append>
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <br />
          <Button type="submit">Buy</Button>
        </Form>
      </div>
    );
  }
}

export default Buy;
