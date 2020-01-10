import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Recipes from "./components/recipes";
import Recipe from "./components/recipe";
import Home from "./components/home";
import Upload from "./components/upload";
import Register from "./components/register";
import Login from "./components/login";
import Users from "./components/users";
import User from "./components/user";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
  );
}

export default App;
