import React, { Component } from "react";
import sha256 from "js-sha256";
import UserContext from "../context/UserContext";
import { Alert, Container, Form, FormGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";

class Login extends Component {
  static contextType = UserContext;

  componentDidMount() {
    if (this.context.authenticated) {
      this.props.history.push("/");
    }
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    const hash = sha256(
      event.password + "placeholdersaltuntiligifigureouthowtohideit"
    );

    await this.context.login({ username: event.username, hash: hash });
    setTimeout(() => {
      if (this.context.username) {
        this.props.history.push("/")
      }
    }, 500)
  }

  render() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .min(3, " ")
        .max(40, " ")
        .required("Enter a username")
        .matches(/^[a-z0-9]+$/i, " "),
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
              <Button type="submit">Login</Button>
            </Form>
          )}
        />
      </Container>
    );
  }
}

export default Login;
