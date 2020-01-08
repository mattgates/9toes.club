import React, { useState, useContext } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";

const Nav = () => {
  const [userStatus, updateUserStatus] = useContext(UserContext);

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
          {userStatus.loggedIn && <li>{userStatus.username}</li>}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
