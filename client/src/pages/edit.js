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

//class for the editing functionality of an existing recipe that has been posted by a user
class Edit extends React.Component {
    constructor(props) {
        super(props);
        //all of the data that is involved in a recipe
        this.state = {
            title: "",
            credited: "",
            prepTimeHour: "",
            prepTimeMinute: "",
            cookTimeHour: "",
            cookTimeMinute: "",
            ingredients: "",
            instructions: "",
            submittedBy: "",
            appetizer: "",
            breakfast: "",
            brunch: "",
            dessert: "",
            dinner: "",
            drink: "",
            lunch: "",
            snack: "",
            hidden: "",
            about: "",
            hours: [
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
            ],
            minutes: [
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
                "55 Minutes"],
            response: "",
            confirm: false //confirm button. true = show delete button
        };

        this.handleDelete = this.handleDelete.bind(this); //submit delete request
        this.handleSubmit = this.handleSubmit.bind(this); //submit edit request
    }

    static contextType = UserContext;

    //when the page loads it checks if the user is credentialed to be editing this recipe
    async componentDidMount() {
        const authenticated = await this.context.verify();

        //if the session isn't valid and the user isn't the poster then redirect
        if (!authenticated && this.props.match.params.username !== this.context.username) {
            this.props.history.push("/");
        }

        //fetch the data on this recipe and set the state to it
        //this is then used to populate the forms with existing recipe data to be edited
        const url = "/api/posts/recipe?_id=" + this.props.match.params.id;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            title: data.title,
            credited: data.credited,
            date: data.date,
            ingredients: data.ingredients.join("\n"),
            instructions: data.instructions.join("\n"),
            submittedBy: data.submittedBy,
            appetizer: data.appetizer,
            breakfast: data.breakfast,
            brunch: data.brunch,
            dessert: data.dessert,
            dinner: data.dinner,
            drink: data.drink,
            lunch: data.lunch,
            snack: data.snack,
            about: data.about,
            hidden: data.hidden
        });

        //splits the concatinated string into the form drop down values
        for (var hourKey in this.state.hours) {
            if (data.prepTime.includes(this.state.hours[hourKey])) this.setState({ prepTimeHour: this.state.hours[hourKey] });
            if (data.cookTime.includes(this.state.hours[hourKey])) this.setState({ cookTimeHour: this.state.hours[hourKey] });
        }
        for (var minuteKey in this.state.minutes) {
            if (data.prepTime.includes(this.state.minutes[minuteKey])) this.setState({ prepTimeMinute: this.state.minutes[minuteKey] });
            if (data.cookTime.includes(this.state.minutes[minuteKey])) this.setState({ cookTimeMinute: this.state.minutes[minuteKey] });
        }
    }

    //submits the changes to the recipe
    async handleSubmit(event) {
        //turns the ingredient/intruction strings into arrays
        const filteredIngredients = event.ingredients.split(/\n/).filter(Boolean);
        const filteredInstructions = event.instructions.split(/\n/).filter(Boolean);

        //convert prep time and cook times into strings
        const prepTimeStr = (event.prepTimeHour !== "0 Hours" && event.prepTimeMinute !== "0 Minutes") ?
            `${event.prepTimeHour} ${event.prepTimeMinute}` : (event.prepTimeHour !== "0 Hours" ? event.prepTimeHour :
                event.prepTimeMinute);

        const cookTimeStr = (event.cookTimeHour !== "0 Hours" && event.cookTimeMinute !== "0 Minutes") ?
            `${event.cookTimeHour} ${event.cookTimeMinute}` : (event.cookTimeHour !== "0 Hours" ? event.cookTimeHour :
                event.cookTimeMinute);

        //if no person was credited with the recipe then it's set to the submitter
        const credited = (event.credited ? event.credited : this.context.username);

        //this is pretty shit and should be refactored but I cba. every instance of this code is crap
        //concatinates all the different types of recipes from the checkboxes together in strings
        //this is used for keeping track of how many of each type of recipe a user has submitted
        let increment = " ";
        let decrement = " ";

        if (this.state.appetizer !== event.appetizer) {
            if (this.state.appetizer) { decrement += "appetizer"; } else { increment += "appetizer"; }
        }
        if (this.state.breakfast !== event.breakfast) {
            if (this.state.breakfast) { decrement += "breakfast"; } else { increment += "breakfast"; }
        }
        if (this.state.brunch !== event.brunch) {
            if (this.state.brunch) { decrement += "brunch"; } else { increment += "brunch"; }
        }
        if (this.state.dessert !== event.dessert) {
            if (this.state.dessert) { decrement += "dessert"; } else { increment += "dessert"; }
        }
        if (this.state.dinner !== event.dinner) {
            if (this.state.dinner) { decrement += "dinner"; } else { increment += "dinner"; }
        }
        if (this.state.drink !== event.drink) {
            if (this.state.drink) { decrement += "drink"; } else { increment += "drink"; }
        }
        if (this.state.lunch !== event.lunch) {
            if (this.state.lunch) { decrement += "lunch"; } else { increment += "lunch"; }
        }
        if (this.state.snack !== event.snack) {
            if (this.state.snack) { decrement += "snack"; } else { increment += "snack"; }
        }

        //POST request to edit the recipe
        const response = await fetch("/api/posts/edit", {
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
                submittedBy: event.submittedBy,
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
                typesToDecrement: decrement,
                typesToIncrement: increment,
                _id: this.props.match.params.id,
                about: event.about ? event.about : " "
            })
        });
        if (response.ok) {
            //redirects to the recipe it was successful
            this.props.history.push("/users/" + this.props.match.params.username + "/" + this.props.match.params.id);
        }
        else {
            //this populates an alert box if the request was denied
            this.setState({ response: "Please check the forms for errors." });
        }
    }

    //requst to delete the post
    async handleDelete() {
        const response = await fetch("/api/posts/delete", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.title,
                _id: this.props.match.params.id
            })
        });
        if (response.error) {
            this.setState({ response: response.error });
        }
        else {
            //redirects home if the delete was successful
            this.props.history.push("/")
        }
    }

    render() {
        //schema for accepted form submissions
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
            about: yup.string().min(0).max(2000, "Writing an essay?"),
            delete: yup.boolean()
        });

        return (
            <Container style={{ width: "50rem" }} className="pb-3 pt-3">
                {this.state.response && (
                    <Alert
                        variant="danger"
                        style={{ textAlign: "center" }}
                        className="m-2"
                    >
                        {this.state.response}
                    </Alert>
                )}
                {/* initializes the forms to have the correct info and handles all the form validation,
                changes, submission, etc.
                
                Not gonna comment the stuff below this. it's just form stuff */}
                <Formik
                    validationSchema={schema}
                    enableReinitialize
                    initialValues={this.state}
                    onSubmit={this.handleSubmit}
                    render={({ values, touched, errors, handleChange, handleSubmit }) => (
                        <Form noValidate onSubmit={handleSubmit} onChange={handleChange}>
                            <Row>
                                <Col>
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
                                </Col>
                                <Col>
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
                                </Col>
                            </Row>
                            <Row
                                style={{ textAlign: "center", borderTop: "1px solid lightGray" }}
                                className="pt-2">
                                <Col>
                                    <label>Food Type</label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Check
                                        custom
                                        inline
                                        label="Appetizer"
                                        type="checkbox"
                                        onChange={handleChange}
                                        value={values.appetizer}
                                        id="appetizer"
                                        isInvalid={touched.appetizer && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                                        checked={values.appetizer}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        inline
                                        label="Breakfast"
                                        type="checkbox"
                                        onChange={handleChange}
                                        value={values.breakfast}
                                        id="breakfast"
                                        isInvalid={touched.breakfast && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                                        checked={values.breakfast}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        inline
                                        label="Brunch"
                                        type="checkbox"
                                        onChange={handleChange}
                                        value={values.brunch}
                                        id="brunch"
                                        isInvalid={touched.brunch && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                                        checked={values.brunch}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        inline
                                        label="Dessert"
                                        type="checkbox"
                                        onChange={handleChange}
                                        value={values.dessert}
                                        id="dessert"
                                        isInvalid={touched.dessert && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                                        checked={values.dessert}
                                    />
                                </Col>
                            </Row>
                            <Row className="pb-2">
                                <Col>
                                    <Form.Check
                                        custom
                                        inline
                                        label="Dinner"
                                        type="checkbox"
                                        onChange={handleChange}
                                        value={values.dinner}
                                        id="dinner"
                                        isInvalid={touched.dinner && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                                        checked={values.dinner}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        inline
                                        label="Drink"
                                        type="checkbox"
                                        onChange={handleChange}
                                        value={values.drink}
                                        id="drink"
                                        isInvalid={touched.drink && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                                        checked={values.drink}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        inline
                                        label="Lunch"
                                        type="checkbox"
                                        onChange={handleChange}
                                        value={values.lunch}
                                        id="lunch"
                                        isInvalid={touched.lunch && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                                        checked={values.lunch}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check
                                        custom
                                        inline
                                        label="Snack"
                                        type="checkbox"
                                        onChange={handleChange}
                                        value={values.snack}
                                        id="snack"
                                        isInvalid={touched.snack && !values.appetizer && !values.breakfast && !values.brunch && !values.dessert && !values.dinner && !values.drink && !values.lunch && !values.snack}
                                        checked={values.snack}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ borderTop: "1px solid lightGray" }} className="pt-2">
                                <Col style={{ textAlign: "center" }}>
                                    <label>Prep Time</label>
                                </Col>
                                <Col style={{ textAlign: "center", borderLeft: "1px solid lightGray" }}>
                                    <label>Cook Time</label>
                                </Col>
                            </Row>
                            <Row style={{ borderBottom: "1px solid lightGray" }} className="pb-2">
                                <Col>
                                    <FormGroup>
                                        <Form.Control
                                            as="select"
                                            required
                                            value={values.prepTimeHour}
                                            onChange={handleChange}
                                            isInvalid={touched.prepTimeHour && values.prepTimeMinute === "0 Minutes" && values.prepTimeHour === "0 Hours"}
                                            name="prepTimeHour"
                                        >
                                            {this.state.hours.map((item, i) => (
                                                <option key={i} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">Please input time</Form.Control.Feedback>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control
                                            as="select"
                                            required
                                            value={values.prepTimeMinute}
                                            isInvalid={touched.prepTimeMinute && values.prepTimeMinute === "0 Minutes" && values.prepTimeHour === "0 Hours"}
                                            onChange={handleChange}
                                            name="prepTimeMinute"
                                        >
                                            {this.state.minutes.map((item, i) => (
                                                <option value={item} key={i}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                                <Col style={{ borderLeft: "1px solid lightGray" }}>
                                    <FormGroup>
                                        <Form.Control
                                            as="select"
                                            required
                                            value={values.cookTimeHour}
                                            onChange={handleChange}
                                            isInvalid={touched.cookTimeHour && values.cookTimeMinute === "0 Minutes" && values.cookTimeHour === "0 Hours"}
                                            name="cookTimeHour"
                                        >
                                            {this.state.hours.map((item, i) => (
                                                <option key={i} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">Please input time</Form.Control.Feedback>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Form.Control
                                            as="select"
                                            required
                                            value={values.cookTimeMinute}
                                            isInvalid={touched.cookTimeMinute && values.cookTimeMinute === "0 Minutes" && values.cookTimeHour === "0 Hours"}
                                            onChange={handleChange}
                                            name="cookTimeMinute"
                                        >
                                            {this.state.minutes.map((item, i) => (
                                                <option value={item} key={i}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Form.Group className="pt-2 pb-2">
                                <Form.Label>Ingredients</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={7}
                                    name="ingredients"
                                    type="text"
                                    onChange={handleChange}
                                    placeholder={"ingredient 1\ningredient 2\ningredient 3\n..."}
                                    value={values.ingredients}
                                    isInvalid={touched.ingredients && errors.ingredients}
                                />
                                <Form.Control.Feedback type="invalid">Please input the ingredients</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="pt-2 pb-2" style={{ borderTop: "1px solid lightGray" }}>
                                <Form.Label>Instructions</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={7}
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
                            <Form.Group className="pt-2 pb-2" style={{ borderTop: "1px solid lightGray" }}>
                                <Form.Label>
                                    About This Recipe <small>(optional)</small>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={7}
                                    name="about"
                                    type="text"
                                    onChange={handleChange}
                                    value={values.about}
                                />
                            </Form.Group>
                            <FormGroup className="pt-2 pb-2"
                                style={{ borderTop: "1px solid lightGray", borderBottom: "1px solid lightGray" }}>
                                <Form.Label>Hidden <small>(optional)</small></Form.Label>
                                <Form.Check
                                    custom
                                    type="checkbox"
                                    label="This will make the recipe only visible to you"
                                    onChange={handleChange}
                                    value={values.hidden}
                                    id="hidden"
                                    checked={values.hidden}
                                />
                            </FormGroup>
                            <Row>
                                <Col>
                                    <Button type="submit" variant="outline-success">
                                        Save Changes
                                    </Button>
                                </Col>
                                {!this.state.confirm &&
                                    <Col>
                                        <Button onClick={() => { this.setState({ confirm: true }) }} className="float-right" variant="danger">Delete</Button>
                                    </Col>
                                }
                                {this.state.confirm &&
                                    <Col>
                                        <Button onClick={() => { this.setState({ confirm: false }) }} variant="outline-dark" className="float-right">Cancel</Button>
                                        <Button onClick={this.handleDelete} variant="danger" className="float-right mr-2">Delete my recipe</Button>
                                    </Col>
                                }
                            </Row>
                        </Form>
                    )}
                />
            </Container>
        );
    }
}

export default Edit;
