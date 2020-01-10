import React from "react";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      prepTimeMinute: 0,
      prepTimeHour: 0,
      cookTimeMinute: 0,
      cookTimeHour: 0,
      author: "",
      submittedBy: "matt",
      type: "",
      ingredients: [],
      instructions: [],
      hidden: false,
      errors: {
        prepTimeMinute: "",
        prepTimeHour: "",
        cookTimeMinute: "",
        cookTimeHour: ""
      },
      response: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateRecipe() {
    return true;
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    const errors = this.state.errors;

    switch (name) {
      case "instructions":
      case "ingredients":
        this.setState({ [name]: value.split(/\r?\n/) });
        break;
      case "cookTimeMinute":
        if (isNaN(value) || value > 59 || value < 0) {
          errors.cookTimeMinute = "Enter a number between 0 and 59";
        } else {
          this.setState({ [name]: this.minuteVsMinutes(value) });
          errors.cookTimeMinute = "";
        }
        break;
      case "prepTimeMinute":
        if (isNaN(value) || value > 59 || value < 0) {
          errors.prepTimeMinute = "Enter a number between 0 and 59";
        } else {
          this.setState({ [name]: this.minuteVsMinutes(value) });
          errors.prepTimeHour = "";
        }
        break;
      case "cookTimeHour":
        if (isNaN(value) || value > 23 || value < 0) {
          errors.cookTimeHour = "Enter a number between 0 and 23";
        } else {
          this.setState({ [name]: this.hourVsHours(value) });
          errors.cookTimeHour = "";
        }
        break;
      case "prepTimeHour":
        if (isNaN(value) || value > 23 || value < 0) {
          errors.prepTimeHour = "Enter a number between 0 and 23";
        } else {
          this.setState({ [name]: this.hourVsHours(value) });
          errors.prepTimeHour = "";
        }
        break;
      default:
        this.setState({ [name]: value });
        break;
    }

    this.setState({ errors });
  }

  hourVsHours(value) {
    let word = "";
    if (value > 1) {
      word = value + " Hours"; // eslint-disable-next-line
    } else if (value == 1) {
      word = value + " Hour";
    }
    return word;
  }

  minuteVsMinutes(value) {
    let word = "";
    if (value > 1) {
      word = value + " Minutes"; // eslint-disable-next-line
    } else if (value == 1) {
      word = value + " Minute";
    }
    return word;
  }

  handleSubmit(event) {
    event.preventDefault();

    const filteredInstructions = this.state.instructions.filter(Boolean);
    const filteredIngredients = this.state.ingredients.filter(Boolean);

    const cookTimeStr =
      this.state.cookTimeHour +
      (this.state.cookTimeHour.length > 0 ? " " : "") +
      this.state.cookTimeMinute;
    const prepTimeStr =
      this.state.prepTimeHour +
      (this.state.prepTimeHour.length > 0 ? " " : "") +
      this.state.prepTimeMinute;

    fetch("/api/posts/recipes", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        prepTime: prepTimeStr,
        cookTime: cookTimeStr,
        author: this.state.author,
        submittedBy: this.state.submittedBy,
        ingredients: filteredIngredients,
        instructions: filteredInstructions,
        hidden: this.state.hidden,
        type: this.state.type
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.setState({ response: data.error.details });
        } else {
          this.props.history.push("/");
        }
      });
    if (this.state.response) {
      console.log(this.state.response);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} noValidate>
          <div>
            <label htmlFor="title">Recipe</label>
            <input
              name="title"
              type="text"
              onChange={this.handleChange}
              noValidate
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              name="author"
              type="text"
              onChange={this.handleChange}
              noValidate
            />
            <small>Leave this blank if you are the author.</small>
          </div>
          <div>
            <p>Prep Time</p>
            <div>
              <label htmlFor="prepTimeHour">Hours</label>
              <input
                name="prepTimeHour"
                type="text"
                onChange={this.handleChange}
                noValidate
              />
              {this.state.errors.prepTimeHour.length > 0 && (
                <span>{this.state.errors.prepTimeHour}</span>
              )}
            </div>
            <div>
              <label htmlFor="prepTimeMinute">Minutes</label>
              <input
                name="prepTimeMinute"
                type="text"
                onChange={this.handleChange}
                noValidate
              />
              {this.state.errors.prepTimeMinute.length > 0 && (
                <span>{this.state.errors.prepTimeMinute}</span>
              )}
            </div>
          </div>
          <div>
            <p>Cook Time</p>
            <div>
              <label htmlFor="cookTimeHour">Hours</label>
              <input
                name="cookTimeHour"
                type="text"
                onChange={this.handleChange}
                noValidate
              />
              {this.state.errors.cookTimeHour.length > 0 && (
                <span>{this.state.errors.cookTimeHour}</span>
              )}
            </div>
            <div>
              <label htmlFor="cookTimeMinute">Minutes</label>
              <input
                name="cookTimeMinute"
                type="text"
                onChange={this.handleChange}
                noValidate
              />
              {this.state.errors.cookTimeMinute.length > 0 && (
                <span>{this.state.errors.cookTimeMinute}</span>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="type">Recipe Type</label>
            <select
              name="type"
              value={this.state.type}
              onChange={this.handleChange}
            >
              <option value="Appetizer">Appetizer</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Brunch">Brunch</option>
              <option value="Dessert">Dessert</option>
              <option value="Dinner">Dinner</option>
              <option value="Drink">Drink</option>
              <option value="Lunch">Lunch</option>
              <option value="Snack">Snack</option>
            </select>
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients</label>
            <textarea name="ingredients" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="instructions">Instructions</label>
            <textarea name="instructions" onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="hidden">Hidden</label>
            <input name="hidden" type="checkbox" />
            <small>
              Check this box if you would like the recipe to be hidden from
              others for now.
            </small>
          </div>
          <input type="submit" value="Submit Recipe" />
        </form>
      </div>
    );
  }
}

export default Upload;
