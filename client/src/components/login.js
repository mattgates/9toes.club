import React, { Component } from "react";
import sha256 from "js-sha256";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      response: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const hash = sha256(
      this.state.password + "placeholdersaltuntiligifigureouthowtohideit"
    );

    fetch("/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: hash
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({ response: data.error });
        } else {
          this.setState({ response: data.response });
          this.props.history.push("/");
        }
      });
  }

  render() {
    return (
      <div>
        {this.state.response && <span>{this.state.response}</span>}
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Login;
