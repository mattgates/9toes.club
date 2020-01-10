import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <NavLink exact to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/recipes">
              <li>Recipes</li>
            </NavLink>
            <NavLink to="/login">
              <li>Login</li>
            </NavLink>
            <NavLink to="/register">
              <li>Register</li>
            </NavLink>
            <NavLink to="/upload">
              <li>Upload</li>
            </NavLink>
            <NavLink to="/users">
              <li>Users</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
