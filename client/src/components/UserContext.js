import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
  const [userStatus, updateUserStatus] = useState({
    username: null,
    loggedIn: false
  });
  return (
    <UserContext.Provider value={[userStatus, updateUserStatus]}>
      {props.children}
    </UserContext.Provider>
  );
};
