import React from "react";
import sha256 from "js-sha256";

const validEmail = RegExp(
  /* eslint-disable-next-line */
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      errors: {
        username: "",
        password: "",
        email: ""
      },
      registered: false,
      response: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    const errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username =
          value.length < 3 ? "Username cannot be less than 3 characters." : "";
        break;
      case "password":
        errors.password =
          value.length < 12 ? "Password must be at least 12 characters." : "";
        break;
      case "email":
        errors.email = validEmail.test(value) ? "" : "Email is not valid";
        break;
      default:
        break;
    }

    if (!this.state.registered) {
      this.setState({ errors, [name]: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.errors.password.length +
        this.state.errors.username.length +
        this.state.errors.email.length ===
      0
    ) {
      const hash = sha256(
        this.state.password + "placeholdersaltuntiligifigureouthowtohideit"
      );

      fetch("/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: hash,
          username: this.state.username
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            this.setState({ response: data.error, registered: false });
          } else {
            this.setState({ registered: true });
            this.props.history.push("/");
          }
        });
      event.target.reset();
    } else {
      this.setState({
        response: "The form has been rejected. Please re-enter your info."
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <h3>
          This website is not properly secured yet. Please do not reuse a
          password from another site.
        </h3>
        {this.state.registered && (
          <span>Thank you for registering, {this.state.username}!</span>
        )}
        {!this.state.registered && <span>{this.state.response}</span>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            onChange={this.handleChange}
            noValidate
          />
          {this.state.errors.username.length > 0 && (
            <span>{this.state.errors.username}</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            onChange={this.handleChange}
            noValidate
          />
          {this.state.errors.email.length > 0 && (
            <span>{this.state.errors.email}</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            onChange={this.handleChange}
            noValidate
          />
          {this.state.errors.password.length > 0 && (
            <span>{this.state.errors.password}</span>
          )}
        </div>
        <input type="submit" value="Create Account" />
      </form>
    );
  }
}

export default Register;
