import React from "react";
import { Container, Card, Row, Button, Badge } from "react-bootstrap";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [],
      author: [],
      date: [],
      submittedBy: [],
      _id: [],
      prepTime: [],
      cookTime: [],
      appetizer: [],
      breakfast: [],
      brunch: [],
      dessert: [],
      dinner: [],
      drink: [],
      lunch: [],
      snack: []
    };
  }

  getRecipes = async () => {
    const response = await fetch("/api/posts/recipes");
    const data = await response.json();
    for (let index = 0; index < data.length; index++) {
      this.setState({
        title: [...this.state.title, data[index].title],
        author: [...this.state.author, data[index].author],
        _id: [...this.state._id, data[index]._id],
        date: [...this.state.date, data[index].date],
        submittedBy: [...this.state.submittedBy, data[index].submittedBy],
        cookTime: [...this.state.cookTime, data[index].cookTime],
        prepTime: [...this.state.prepTime, data[index].prepTime],
        appetizer: [...this.state.appetizer, data[index].appetizer],
        breakfast: [...this.state.breakfast, data[index].breakfast],
        brunch: [...this.state.brunch, data[index].brunch],
        dessert: [...this.state.dessert, data[index].dessert],
        dinner: [...this.state.dinner, data[index].dinner],
        drink: [...this.state.drink, data[index].drink],
        lunch: [...this.state.lunch, data[index].lunch],
        snack: [...this.state.snack, data[index].snack]
      });
    }
  };

  componentDidMount() {
    this.getRecipes();
  }

  render() {
    return (
      <Container>
        <Row>
          {this.state._id.map((item, i) => (
            <Card style={{ width: "20rem" }} className="col-auto m-2" key={i}>
              <Card.Body>
                <Card.Title>{this.state.title[i]}</Card.Title>
                <Card.Text>
                  Prep Time: {this.state.prepTime[i]} <br />
                  Cook Time: {this.state.cookTime[i]} <br />
                  Submitted by: {this.state.submittedBy[i]} <br />
                  {this.state.appetizer[i] && <Badge pill variant="info" className="m-1">Appetizer</Badge>}
                  {this.state.breakfast[i] && <Badge pill variant="info" className="m-1">Breakfast</Badge>}
                  {this.state.brunch[i] && <Badge pill variant="info" className="m-1">Brunch</Badge>}
                  {this.state.dessert[i] && <Badge pill variant="info" className="m-1">Dessert</Badge>}
                  {this.state.dinner[i] && <Badge pill variant="info" className="m-1">Dinner</Badge>}
                  {this.state.drink[i] && <Badge pill variant="info" className="m-1">Drink</Badge>}
                  {this.state.lunch[i] && <Badge pill variant="info" className="m-1">Lunch</Badge>}
                  {this.state.snack[i] && <Badge pill variant="info" className="m-1">Snack</Badge>}
                </Card.Text>
                <Button
                  href={`/users/${this.state.submittedBy[i]}/${this.state._id[i]}`}
                  size="sm"
                  variant="info"
                >
                  Try it!
                  </Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Recipes;
