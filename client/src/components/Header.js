import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { auth } from "../firebase/firebase.utils";

const Header = ({ currentUser }) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/dashboard">My Stock Portfolio</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#"></Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Nav>
        {currentUser ? (
          <div>
            <Nav.Link href="#" onClick={() => auth.signOut()}>
              Sign Out
            </Nav.Link>
          </div>
        ) : (
          <div>
            <Nav.Link href="/">Sign In</Nav.Link>
          </div>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
