import React from "react";
import UserContext from "../context/UserContext";
import { Button, Navbar, Nav, ButtonGroup } from "react-bootstrap";

const NavBar = props => {
  return (
    <UserContext.Consumer>
      {/* these two are used from the UserContext. logout for logout button and username for displaying who is logged in */}
      {({ username, logout }) => (
        <Navbar bg="dark" variant="dark">
          <Nav>
            <Navbar.Brand href="/">9toes.club</Navbar.Brand>
            <Nav.Link href="/recipes">Recipes</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            {/* If the user is logged in then display upload button */}
            {username ? (
              <React.Fragment>
                <Nav.Link href="/upload">Upload</Nav.Link>
                <Nav.Link href={`/users/${username}`}>My Recipes</Nav.Link>
              </React.Fragment>
            ) : (
                <React.Fragment />
              )}
          </Nav>
          <Nav>
            {/* If the user is logged in then display username and logout button
                  otherwise show the login/register buttons */}
            {username ? (
              <React.Fragment>
                <Button variant="outline-info" href="/" onClick={logout}>
                  Logout
                        </Button>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <ButtonGroup>
                    <Button variant="outline-info" href="/login">Login</Button>
                    <Button variant="outline-info" href="/register">Register</Button>
                  </ButtonGroup>
                </React.Fragment>
              )}
          </Nav>
        </Navbar>
      )}
    </UserContext.Consumer>
  );
}

export default NavBar;
