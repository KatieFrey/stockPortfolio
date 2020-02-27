import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import SignInForm from "../forms/SignInForm";

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
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignInContainer;
