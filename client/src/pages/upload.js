import React from "react";
import UserContext from "../context/UserContext";
import {
  Alert,
  Container,
  Row,
  Form,
  FormGroup,
  Button,
  Col
} from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";

class Upload extends React.Component {
  static contextType = UserContext;
  async componentDidMount() {
    const authenticated = await this.context.verify();
    if (!authenticated) {
      this.props.history.push("/");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      response: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    console.log(event);

    const filteredIngredients = event.ingredients.split(/\n/).filter(Boolean);
    const filteredInstructions = event.instructions.split(/\n/).filter(Boolean);

    const prepTimeStr = (event.prepTimeHour !== "0 Hours" && event.prepTimeMinute !== "0 Minutes") ?
      `${event.prepTimeHour} ${event.prepTimeMinute}` : (event.prepTimeHour !== "0 Hours" ? event.prepTimeHour :
        event.prepTimeMinute);

    const cookTimeStr = (event.cookTimeHour !== "0 Hours" && event.cookTimeMinute !== "0 Minutes") ?
      `${event.cookTimeHour} ${event.cookTimeMinute}` : (event.cookTimeHour !== "0 Hours" ? event.cookTimeHour :
        event.cookTimeMinute);

    const credited = event.credited === "" ? this.context.username : event.credited;

    const response = await fetch("/api/posts/recipes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: event.title,
        prepTime: prepTimeStr,
        cookTime: cookTimeStr,
        credited: credited,
        submittedBy: this.context.username,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
        hidden: event.hidden,
        appetizer: event.appetizer,
        breakfast: event.breakfast,
        brunch: event.brunch,
        dessert: event.dessert,
        dinner: event.dinner,
        drink: event.drink,
        lunch: event.lunch,
        snack: event.snack,
      })
    });
    if (response.ok) {
      this.props.history.push("/");
    }
    else {
      this.setstate({ response: "Please check the forms for errors." });
    }
  }

  render() {
    const schema = yup.object().shape({
      title: yup
        .string()
        .min(1)
        .max(200, "Too long").trim()
        .required("You must title your submission"),
      credited: yup
        .string()
        .min(1)
        .max(40, "Names aren't that long"),
      appetizer: yup.boolean(),
      breakfast: yup.boolean(),
      brunch: yup.boolean(),
      dessert: yup.boolean(),
      dinner: yup.boolean(),
      drink: yup.boolean(),
      lunch: yup.boolean(),
      snack: yup.boolean(),
      ingredients: yup
        .string()
        .min(1, "Enter ingredients")
        .max(2000, "Writing an essay?")
        .required(),
      instructions: yup
        .string()
        .min(1, "Enter instructions")
        .max(2000, "Writing an essay?")
        .required(),
      hidden: yup.boolean().required(),
      about: yup.string().max(2000, "Writing an essay?")
    });

    const initial = {
      title: "",
      prepTimeMinute: "0 Minutes",
      prepTimeHour: "0 Hours",
      cookTimeMinute: "0 Minutes",
      cookTimeHour: "0 Hours",
      credited: "",
      appetizer: false,
      breakfast: false,
      brunch: false,
      dessert: false,
      dinner: false,
      drink: false,
      lunch: false,
      snack: false,
      ingredients: "",
      instructions: "",
      hidden: false,
      about: ""
    };

    const hours = [
      "0 Hours",
      "1 Hour",
      "2 Hours",
      "3 Hours",
      "4 Hours",
      "5 Hours",
      "6 hours",
      "7 Hours",
      "8 Hours",
      "9 Hours"
    ];
    const minutes = [
      "0 Minutes",
      "5 Minutes",
      "10 Minutes",
      "15 Minutes",
      "20 Minutes",
      "25 Minutes",
      "30 Minutes",
      "35 Minutes",
      "40 Minutes",
      "45 Minutes",
      "50 Minutes",
      "55 Minutes"
    ];

    return (
      <Container style={{ width: "30rem" }}>
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
          render={({ values, touched, errors, handleChange, handleSubmit }) => (
            <Form noValidate onSubmit={handleSubmit} onChange={handleChange}>
              <FormGroup>
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={touched.title && errors.title}
                  placeholder="title"
                  name="title"
                />
                <Form.Control.Feedback type="invalid" name="title">
                  {errors.title}
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>
                  Credited To <small>(optional)</small>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={values.credited}
                  onChange={handleChange}
                  isInvalid={errors.credited}
                  placeholder="credited to"
                  name="credited"
                />
                <Form.Control.Feedback type="invalid" name="credited">
                  {errors.credited}
                </Form.Control.Feedback>
              </FormGroup>
              <label>Food Type</label>
              <Container>
                <Row>
                  <Col md={3}>
                    <Form.Check
                      custom
                      inline
                      label="Appetizer"
                      type="checkbox"
                      onChange={handleChange}
                      value={values.appetizer}
                      id="appetizer"
                      isInvalid={touched.appetizer && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      custom
                      inline
                      label="Breakfast"
                      type="checkbox"
                      onChange={handleChange}
                      value={values.breakfast}
                      id="breakfast"
                      isInvalid={touched.breakfast && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      custom
                      inline
                      label="Brunch"
                      type="checkbox"
                      onChange={handleChange}
                      value={values.brunch}
                      id="brunch"
                      isInvalid={touched.brunch && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      custom
                      inline
                      label="Dessert"
                      type="checkbox"
                      onChange={handleChange}
                      value={values.dessert}
                      id="dessert"
                      isInvalid={touched.dessert && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <Form.Check
                      custom
                      inline
                      label="Dinner"
                      type="checkbox"
                      onChange={handleChange}
                      value={values.dinner}
                      id="dinner"
                      isInvalid={touched.dinner && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      custom
                      inline
                      label="Drink"
                      type="checkbox"
                      onChange={handleChange}
                      value={values.drink}
                      id="drink"
                      isInvalid={touched.drink && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      custom
                      inline
                      label="Lunch"
                      type="checkbox"
                      onChange={handleChange}
                      value={values.lunch}
                      id="lunch"
                      isInvalid={touched.lunch && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      custom
                      inline
                      label="Snack"
                      type="checkbox"
                      onChange={handleChange}
                      value={values.snack}
                      id="snack"
                      isInvalid={touched.snack && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                    />
                  </Col>
                </Row>
              </Container>
              <label>Prep Time</label>
              <Form.Row>
                <FormGroup as={Col}>
                  <Form.Control
                    as="select"
                    required
                    value={values.prepTimeHour}
                    onChange={handleChange}
                    isInvalid={touched.prepTimeHour && values.prepTimeMinute === "0 Minutes" && values.prepTimeHour === "0 Hours"}
                    name="prepTimeHour"
                  >
                    {hours.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">Please input time</Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col}>
                  <Form.Control
                    as="select"
                    required
                    value={values.prepTimeMinute}
                    isInvalid={touched.prepTimeMinute && values.prepTimeMinute === "0 Minutes" && values.prepTimeHour === "0 Hours"}
                    onChange={handleChange}
                    name="prepTimeMinute"
                  >
                    {minutes.map((item, i) => (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                </FormGroup>
              </Form.Row>
              <label>Cook Time</label>
              <Form.Row>
                <FormGroup as={Col}>
                  <Form.Control
                    as="select"
                    required
                    value={values.cookTimeHour}
                    onChange={handleChange}
                    isInvalid={touched.cookTimeHour && values.cookTimeMinute === "0 Minutes" && values.cookTimeHour === "0 Hours"}
                    name="cookTimeHour"
                  >
                    {hours.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">Please input time</Form.Control.Feedback>
                </FormGroup>
                <FormGroup as={Col}>
                  <Form.Control
                    as="select"
                    required
                    value={values.cookTimeMinute}
                    isInvalid={touched.cookTimeMinute && values.cookTimeMinute === "0 Minutes" && values.cookTimeHour === "0 Hours"}
                    onChange={handleChange}
                    name="cookTimeMinute"
                  >
                    {minutes.map((item, i) => (
                      <option value={item} key={i}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                </FormGroup>
              </Form.Row>
              <Form.Group>
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="ingredients"
                  type="text"
                  onChange={handleChange}
                  placeholder={"ingredient 1\ningredient 2\ningredient 3\n..."}
                  value={values.ingredients}
                  isInvalid={touched.ingredients && errors.ingredients}
                />
                <Form.Control.Feedback type="invalid">Please input the ingredients</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="instructions"
                  type="text"
                  onChange={handleChange}
                  placeholder={
                    "instruction 1\ninstruction 2\ninstruction 3\n..."
                  }
                  value={values.instructions}
                  isInvalid={touched.instructions && errors.instructions}
                />
                <Form.Control.Feedback type="invalid">Please input the instructions</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  About This Recipe <small>(optional)</small>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="about"
                  type="text"
                  onChange={handleChange}
                  value={values.about}
                />
              </Form.Group>
              <FormGroup>
                <Form.Label>Hidden <small>(optional)</small></Form.Label>
                <Form.Check
                  custom
                  type="checkbox"
                  label="This will make the recipe only visible to you"
                  onChange={handleChange}
                  value={values.hidden}
                  id="hidden"
                />
              </FormGroup>
              <Button type="submit">
                Submit Recipe
              </Button>
            </Form>
          )}
        />
      </Container>
    );
  }
}

export default Upload;
