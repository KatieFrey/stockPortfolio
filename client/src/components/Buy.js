import React from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { auth, firestore } from "../firebase/firebase.utils";
import quote from "../utils/getQuoteEXI";

class Buy extends React.Component {
  constructor(props) {
    super();
    this.state = {
      ticker: "",
      quantity: null,
      total: 0,
      userData: null,
      test: false,
      disabled: true
    };
  }
  componentDidMount() {
    this.getCurrentUserData();
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

  calculateAmount = async event => {
    event.preventDefault();
    //Check the quantity to see if its a number, and if it's a float, alert if its not
    this.setState(
      {
        test: true,
        quantity: Math.round(this.state.quantity)
      },
      console.log(this.state.test)
    );

    //Call the api for the symbol

    const quoteData = await quote(this.state.ticker);
    //console.log("QuoteData: ", quoteData);

    //Check if the ticker symbol is valid, alert if it's not

    if (quoteData === "Request failed with status code 404") {
      alert("Invalid stock symbol, try another");
    }

    this.setState({
      total: this.state.quantity * quoteData.latestPrice
    });

    await this.getCurrentUserData();

    console.log("Inside calculateAmount state: ", this.state);

    //Check the total against the balance, if the total is more than the balance, alert. Else, alter the user's balance

    if (this.state.userData && this.state.total > this.state.userData.balance) {
      return;
    }

    this.setState({ disabled: false });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, createdAt, balance } = this.state.userData;
    const firebaseUser = await auth.currentUser;
    // console.log("current user: ", currentUser);
    //const currentUser = await auth.currentUser;
    // const currentUserStuff = await firestore
    //   .doc(`users/${currentUser.uid}`)
    //   .get();
    // console.log("currentUser buy: ", currentUserStuff);

    if (this.props.currentUser) {
      console.log("Props buy: ", this.props.currentUser);

      firestore
        .collection("users")
        .doc(firebaseUser.uid)
        .set({
          displayName: displayName,
          email: email,
          createdAt: createdAt,
          balance: (balance - this.state.total).toFixed(2)
        });
    }
    const tickerSet = new Set();

    //Make sure we can update the transaction list and portfolio

    const transactions = await firestore
      .collection("users")
      .doc(firebaseUser.uid)
      .collection("portfolio")
      .get()
      .then(querySnapShot => {
        console.log("Query snap shot: ", querySnapShot);
        querySnapShot.forEach(doc => {
          let data = doc.data();
          let currentID = doc.id;
          let currentQuant = data.quantity;
          tickerSet.add(data.ticker);
          if (data.ticker === this.state.ticker) {
            firestore
              .collection("users")
              .doc(firebaseUser.uid)
              .collection("portfolio")
              .doc(currentID)
              .set({
                ticker: this.state.ticker,
                quantity: this.state.quantity + currentQuant
              });
          }
        });
      });

    //Create a portfolio instance/collection for the user
    if (!tickerSet.has(this.state.ticker)) {
      await firestore
        .collection("users")
        .doc(firebaseUser.uid)
        .collection("portfolio")
        .add({
          ticker: this.state.ticker,
          quantity: this.state.quantity
        });
    }
    //Create a transaction instance/collection for the user
    await firestore
      .collection("users")
      .doc(firebaseUser.uid)
      .collection("transactions")
      .add({
        ticker: this.state.ticker,
        quantity: this.state.quantity,
        total: this.state.total,
        date: new Date()
      });
  };

  getCurrentUserData = async () => {
    const firebaseUser = await auth.currentUser;
    const userRef = await firestore.doc(`users/${firebaseUser.uid}`);

    await userRef.onSnapshot(snapShot => {
      this.setState({ userData: snapShot.data() });
    });
  };

  render() {
    console.log("Inside render state: ", this.state);
    const { userData, total } = this.state;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <br />
          <h2>
            Your balance is $
            {this.state.userData && this.state.userData.balance}
          </h2>
          <br />
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Ticker Symbol</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={this.handleChange}
              name="ticker"
              value={this.state.ticker}
              placeholder="Choose a Ticker Symbol. (Ex. AAPL for Apple)"
              aria-label="Ticker Symbol"
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
              placeholder="Type in how many shares you want to buy, whole numbers please"
              aria-label="Amount (to the nearest dollar)"
            />
          </InputGroup>
          <br />
          <Button type="input" onClick={this.calculateAmount}>
            Calculate
          </Button>
          {this.state && this.state.test ? (
            <Button
              disabled={this.state && this.state.disabled ? true : false}
              style={{ marginLeft: "20px" }}
              type="submit"
            >
              Buy
            </Button>
          ) : null}
          <br />
          <br />
          {<h1>{`$${this.state.total.toFixed(2)}`}</h1>}
          {userData && userData.balance < total ? (
            <div style={{ color: "red" }}>
              Your total is more than your balance
            </div>
          ) : null}
        </Form>
      </div>
    );
  }
}

export default Buy;
