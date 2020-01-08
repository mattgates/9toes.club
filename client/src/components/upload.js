import React from "react";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      prepTime: null,
      cooktime: null,
      author: null,
      submittedBy: null,
      type: null,
      ingredients: [],
      instructions: [],
      hidden: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateRecipe() {
    return true;
  }

  handleChange(event) {
    event.preventDefault();
  }

  handleSubmit(event) {
    event.preventDefault();

    const valid = this.validateRecipe();
    if (valid) {
      fetch("/api/posts/recipes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: this.state.title,
          prepTime: this.state.prepTime,
          cooktime: this.state.cooktime,
          author: this.state.author,
          submittedBy: this.state.submittedBy,
          ingredients: this.state.ingredients,
          instructions: this.state.instructions,
          hidden: this.state.hidden,
          type: this.state.type
        })
      });
    }
  }

  render() {
    return (
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
          </div>
          <div>
            <label htmlFor="prepTimeMinute">Minutes</label>
            <input
              name="prepTimeMinutes"
              type="text"
              onChange={this.handleChange}
              noValidate
            />
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
          </div>
          <div>
            <label htmlFor="cookTimeMinute">Minutes</label>
            <input
              name="cookTimeMinutes"
              type="text"
              onChange={this.handleChange}
              noValidate
            />
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
          <textarea name="ingredients" />
        </div>
        <div>
          <label htmlFor="instructions">Instructions</label>
          <textarea name="instructions" />
        </div>
        <div>
          <label htmlFor="hidden">Hidden</label>
          <input name="hidden" type="checkbox" />
          <small>
            Check this box if you would like the recipe to be hidden from others
            for now.
          </small>
        </div>
        <input type="submit" value="Submit Recipe" />
      </form>
    );
  }
}

export default Upload;
