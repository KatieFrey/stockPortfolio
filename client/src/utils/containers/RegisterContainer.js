import React from "react";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import RegisterForm from "../forms/RegisterForm";
import { signInWithGoogle } from "../../firebase/firebase.utils";

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
            <Card.Link href="/">Already a User?</Card.Link>
            <Button onClick={signInWithGoogle} style={{ marginLeft: "20px" }}>
              Sign Up With Google
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default RegisterContainer;
