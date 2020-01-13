import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";
import Home from "./pages/home";
import Upload from "./pages/upload";
import Register from "./pages/register";
import Login from "./pages/login";
import Users from "./pages/users";
import User from "./pages/user";
import GlobalState from './context/GlobalState';

const App = props => {
  return (
    <GlobalState value={props}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/recipes" component={Recipes} />
          <Route path="/users/:username/:id" component={Recipe} />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/upload" component={Upload} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:username" component={User} />
        </Switch>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
