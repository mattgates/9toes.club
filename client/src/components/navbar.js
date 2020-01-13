import React from "react";
import UserContext from "../context/UserContext";
import { Button, Navbar, Nav, Container, Row, Col } from "react-bootstrap";

const NavBar = props => {
  return (
    <UserContext.Consumer>
      {/* these two are used from the UserContext. logout for logout button and username for displaying who is logged in */}
      {({ username, logout }) => (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Row>
              <Col>
                <Nav>
                  <Navbar.Brand href="/">9toes.club</Navbar.Brand>
                  <Nav.Link href="/recipes">Recipes</Nav.Link>
                  <Nav.Link href="/users">Users</Nav.Link>
                  {/* If the user is logged in then display upload button */}
                  {username ? (
                    <Nav.Link href="/upload">Upload</Nav.Link>
                  ) : (
                      <React.Fragment />
                    )}
                </Nav>
              </Col>
              <Col>
                <Nav>
                  {/* If the user is logged in then display username and logout button
                  otherwise show the login/register buttons */}
                  {username ? (
                    <React.Fragment>
                      <Navbar.Brand>{username}</Navbar.Brand>
                      <Button className="primary" href="/" onClick={logout}>
                        Logout
                        </Button>
                    </React.Fragment>
                  ) : (
                      <React.Fragment>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                      </React.Fragment>
                    )}
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar>
      )}
    </UserContext.Consumer>
  );
}

export default NavBar;
