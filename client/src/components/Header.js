import React from "react";
import { Navbar, Nav } from "react-bootstrap";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  getUser() {
    //if user is true link path is to dashboard, else to signin page
  }

  render() {
    return (
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="/dashboard">My Stock Portfolio</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#"></Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
