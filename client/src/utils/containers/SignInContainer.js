import React from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import SignInForm from "../forms/SignInForm";

import { signInWithGoogle } from "../../firebase/firebase.utils";

const SignInContainer = () => (
  <Container>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title> Sign In</Card.Title>
            <br />
            <SignInForm />
            <br />
            <Card.Link href="/register">Register as a User</Card.Link>
            <Button onClick={signInWithGoogle} style={{ marginLeft: "20px" }}>
              Sign In With Google
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignInContainer;
