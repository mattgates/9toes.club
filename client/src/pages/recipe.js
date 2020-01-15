import React from "react";
import "../App.css";
import { Jumbotron, Badge, Button } from "react-bootstrap";
import UserContext from '../context/UserContext';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      credited: "",
      type: "",
      date: "",
      prepTime: "",
      cookTime: "",
      ingredients: [],
      instructions: [],
      submittedBy: "",
      appetizer: "",
      breakfast: "",
      brunch: "",
      dessert: "",
      dinner: "",
      drink: "",
      lunch: "",
      snack: ""
    };
  }

  async componentDidMount() {
    const url = "/api/posts/recipe?_id=" + this.props.match.params.id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      title: data.title,
      credited: data.credited,
      date: data.date,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      ingredients: data.ingredients,
      instructions: data.instructions,
      submittedBy: data.submittedBy,
      appetizer: data.appetizer,
      breakfast: data.breakfast,
      brunch: data.brunch,
      dessert: data.dessert,
      dinner: data.dinner,
      drink: data.drink,
      lunch: data.lunch,
      snack: data.snack
    });
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ username }) => (
          <Jumbotron>
            <h1>{this.state.title}</h1>
            {this.state.appetizer && <Badge pill variant="info" className="m-1">Appetizer</Badge>}
            {this.state.breakfast && <Badge pill variant="info" className="m-1">Breakfast</Badge>}
            {this.state.brunch && <Badge pill variant="info" className="m-1">Brunch</Badge>}
            {this.state.dessert && <Badge pill variant="info" className="m-1">Dessert</Badge>}
            {this.state.dinner && <Badge pill variant="info" className="m-1">Dinner</Badge>}
            {this.state.drink && <Badge pill variant="info" className="m-1">Drink</Badge>}
            {this.state.lunch && <Badge pill variant="info" className="m-1">Lunch</Badge>}
            {this.state.snack && <Badge pill variant="info" className="m-1">Snack</Badge>}
            <h3>
              Submitted by {this.state.submittedBy}
              {this.state.submittedBy !== this.state.credited && ` and credited to ${this.state.credited}`}
            </h3>
            <h5>Prep Time: {this.state.prepTime}</h5>
            <h5>Cook Time: {this.state.cookTime}</h5>
            <h5>Ingredients</h5>
            <ul>
              {this.state.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <h5>Instructions</h5>
            <ol>
              {this.state.instructions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
            {username === this.state.submittedBy &&
              <Button variant="outline-info" href={`/users/${username}/${this.props.match.params.id}/edit`}>
                Edit
            </Button>
            }
          </Jumbotron>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Recipe;
