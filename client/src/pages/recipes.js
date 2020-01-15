import React from "react";
import { Container, Card, Row, ButtonGroup, Button, Badge } from "react-bootstrap";
import UserContext from "../context/UserContext";

class Recipes extends React.Component {
  static contextType = UserContext;

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
      snack: [],
      hidden: []
    };
  }

  getRecipes = async () => {
    const response = await fetch("/api/posts/recipes");
    const data = await response.json();
    for (let index = 0; index < data.length; index++) {
      if (this.context.username !== data[index].submittedBy && data[index].hidden) {
        continue;
      }
      this.setState({
        title: [...this.state.title, data[index].title],
        credited: [...this.state.author, data[index].credited],
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
        snack: [...this.state.snack, data[index].snack],
        hidden: [...this.state.hidden, data[index].hidden]
      });
    }
  };

  componentDidMount() {
    this.getRecipes();
  }

  render() {
    return (
      <UserContext.Consumer>
        {/* these two are used from the UserContext. logout for logout button and username for displaying who is logged in */}
        {({ username }) => (
          <Container>
            <Row>
              {this.state._id.map((item, i) => (
                <Card style={{
                  width: "20rem",
                }} className="col-auto m-2" key={i}>
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
                      {this.state.hidden[i] && <Badge pill variant="danger" className="m-1">Hidden</Badge>}
                    </Card.Text>
                    <ButtonGroup>
                      <Button
                        href={`/users/${this.state.submittedBy[i]}/${this.state._id[i]}`}
                        size="sm"
                        variant="outline-info"
                      >
                        Try it!
                  </Button>
                      {username === this.state.submittedBy[i] &&
                        <Button
                          href={`/users/${this.state.submittedBy[i]}/${this.state._id[i]}/edit`}
                          size="sm"
                          variant="outline-info"
                        >Edit Post</Button>
                      }
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </Container>
        )}</UserContext.Consumer>
    );
  }
}

export default Recipes;
