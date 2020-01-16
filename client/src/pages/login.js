import React, { Component } from "react";
import sha256 from "js-sha256";
import UserContext from "../context/UserContext";
import { Alert, Container, Form, FormGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";

//class for login page
class Login extends Component {
  static contextType = UserContext;

  //checks if the user is already credentialed. If so then it redirects them home
  componentDidMount() {
    if (this.context.username) {
      this.props.history.push("/");
    }
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //submission of login data
  async handleSubmit(event) {
    //I meant to hide the salt before I made the website live. kinda too late now considering people have
    //already made accounts and what not
    //At least I made a warning not to put in real credentials. It's properly hashed on the server side
    //but none of this matters anyways because it's not https
    const hash = sha256(
      event.password + "placeholdersaltuntiligifigureouthowtohideit"
    );

    //attempts to log the user in. The setTimeout is because it was having issues
    //calling the redirect while waiting on the fetch response even though it's async/await
    await this.context.login({ username: event.username, hash: hash });
    setTimeout(() => {
      if (this.context.username) {
        this.props.history.push("/");
      }
    }, 500);
  }

  render() {
    //schema for what usernamesand passwords are accepted
    const schema = yup.object().shape({
      username: yup
        .string()
        .min(3, " ")
        .max(40, " ")
        .required("Enter a username")
        .matches(/^[a-z0-9]+$/i, " "), //alphanumeric regex
      password: yup
        .string()
        .min(12, " ")
        .max(100, " ")
        .required("Enter a password")
    });

    const initial = {
      username: "",
      password: ""
    };

    return (
      <Container style={{ width: "30rem" }}>
        <Alert variant="danger" style={{ textAlign: "center" }} className="m-2">
          This website is not properly secured yet.
          <br />
          Please do not reuse a password from another site.
        </Alert>
        {this.context.authenticated && (
          <Alert
            variant="success"
            style={{ textAlign: "center" }}
            className="m-2"
          >
            Logged in as {this.context.username}
          </Alert>
        )}
        {/* //! Fix this so it tells the user if their credentials were invalid */}
        {/* {!this.state.response.match(`\\bLogged in as\\b`) &&
          this.state.response && (
            <Alert
              variant="danger"
              style={{ textAlign: "center" }}
              className="m-2"
            >
              {this.state.response}
            </Alert>
          )} */}
        <Formik
          validationSchema={schema}
          initialValues={initial}
          onSubmit={this.handleSubmit}
          render={({ values, handleChange, handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit} onChange={handleChange}>
              <FormGroup>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  placeholder="username"
                  name="username"
                />
              </FormGroup>
              <FormGroup name="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="password"
                  name="password"
                />
              </FormGroup>
              <Button variant="outline-info" type="submit" className="mr-2">
                Login
              </Button>
              <Button variant="outline-info" href="/register">
                I don't have an account
              </Button>
            </Form>
          )}
        />
      </Container>
    );
  }
}

export default Login;
