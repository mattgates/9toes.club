import { createContext } from "react";

//creates user context for login/logout/session
//used by GlobalContext
export default createContext({
  username: "",
  _id: "",
  login: user => {},
  logout: () => {},
  verify: () => {}
});
