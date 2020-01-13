import { createContext } from "react";

export default createContext({
  username: "",
  _id: "",
  login: user => { },
  logout: () => { },
  verify: () => { }
});