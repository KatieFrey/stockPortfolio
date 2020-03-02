import React from "react";
import { Form, Button } from "react-bootstrap";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { withRouter } from "react-router-dom";

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      registered: false,
      error: ""
    };
  }

  handleChange = async event => {
    await this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log("RegisterForm props: ", this.props);
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert(`Passwords don't match`);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      //Remember createUserProfileDocument takes an additionalData parameter
      createUserProfileDocument(user, { displayName, balance: 5000 });

      this.setState({
        registered: true
      });

      console.log("Registered: ", this.state.registered);

      //Reset state
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      this.props.history.push("/");

      // return <Redirect to="/" />;
    } catch (error) {
      console.log(error.message);
      this.setState({ error: error.message });
      //console.error(error);
    }
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="displayName"
            onChange={this.handleChange}
            value={this.state.username}
            placeholder="Enter username"
          />
          <Form.Text className="text-muted">
            This name will be used as your profile name
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <div style={{ color: "red" }}>{this.state.error}</div>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            onChange={this.handleChange}
            value={this.state.confirmPassword}
            placeholder="Retype your password"
          />
        </Form.Group>

        {this.state.registered ? (
          <Button variant="secondary">Sign In</Button>
        ) : (
          <Button variant="primary" type="submit">
            Register
          </Button>
        )}
      </Form>
    );
  }
}

export default withRouter(RegisterForm);
