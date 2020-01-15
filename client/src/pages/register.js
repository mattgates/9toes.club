import React from "react";
import sha256 from "js-sha256";
import { Alert, Container, Form, FormGroup, Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      response: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log("submitted");
    const hash = sha256(
      event.password + "placeholdersaltuntiligifigureouthowtohideit"
    );

    fetch("/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: event.email,
        password: hash,
        username: event.username
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({ response: data.error, registered: false });
        } else {
          this.props.history.push("/");
        }
      });
  }

  render() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .min(3, "Your username must be at least 3 characters")
        .max(40, "Your username can't be that long")
        .required("Enter a username")
        .matches(/^[a-z0-9]+$/i, "Your username must be alphanumeric"),
      password: yup
        .string()
        .min(12, "Your password must be at least 12 characters")
        .max(100, "Your password can't be that long")
        .required("Enter a password"),
      email: yup
        .string()
        .email("Enter a valid email")
        .required("Enter an email")
    });

    const initial = {
      username: "",
      password: "",
      email: ""
    };

    return (
      <Container style={{ width: "30rem" }}>
        <Alert variant="danger" style={{ textAlign: "center" }} className="m-2">
          This website is not properly secured yet.
          <br />
          Please do not reuse a password from another site.
        </Alert>
        {this.state.response && (
          <Alert
            variant="danger"
            style={{ textAlign: "center" }}
            className="m-2"
          >
            {this.state.response}
          </Alert>
        )}
        <Formik
          validationSchema={schema}
          initialValues={initial}
          onSubmit={this.handleSubmit}
          render={({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit} onChange={handleChange}>
              <FormGroup>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                  placeholder="email@example.com"
                  name="email"
                />
                <Form.Control.Feedback type="invalid" name="email">
                  {errors.email}
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  isValid={touched.username && !errors.username}
                  isInvalid={touched.username && errors.username}
                  placeholder="username"
                  name="username"
                />
                <Form.Control.Feedback type="invalid" name="username">
                  {errors.username}
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && errors.password}
                  placeholder="password"
                  name="password"
                />
                <Form.Control.Feedback type="invalid" name="password">
                  {errors.password}
                </Form.Control.Feedback>
              </FormGroup>
              <Button variant="outline-info" type="submit" className="mr-2">Create Account</Button>
              <Button variant="outline-info" href="/login">I already have an account</Button>
            </Form>
          )}
        />
      </Container>
    );
  }
}

export default Register;
