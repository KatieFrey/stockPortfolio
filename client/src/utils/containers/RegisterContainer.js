import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import RegisterForm from "../forms/RegisterForm";

const RegisterContainer = () => (
  <Container>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Register</Card.Title>
            <br />
            <RegisterForm />
            <br />
            <Card.Link href="/signin">Already a User? Signin</Card.Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default RegisterContainer;
