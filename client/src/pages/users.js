import React from "react";
import { Accordion, Card, Container, Button, Row, Col, Badge } from "react-bootstrap";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: [],
      submissions: [],
      dessert: [],
      drink: [],
      dinner: [],
      lunch: [],
      breakfast: [],
      brunch: [],
      snack: [],
      appetizer: []
    };
  }

  getUsers = async () => {
    const response = await fetch("/api/users/list");
    const data = await response.json();
    for (let index = 0; index < data.length; index++) {
      this.setState({
        username: [...this.state.username, data[index].username],
        submissions: [...this.state.submissions, data[index].submissions],
        dessert: [...this.state.dessert, data[index].dessert],
        drink: [...this.state.drink, data[index].drink],
        dinner: [...this.state.dinner, data[index].dinner],
        lunch: [...this.state.lunch, data[index].lunch],
        breakfast: [...this.state.breakfast, data[index].breakfast],
        brunch: [...this.state.brunch, data[index].brunch],
        snack: [...this.state.snack, data[index].snack],
        appetizer: [...this.state.appetizer, data[index].appetizer]
      });
    }
  };

  //`/users/${this.state.username[i]}`
  componentDidMount() {
    this.getUsers();
  }
  render() {
    return (
      <div>
        <Container>
          <Accordion style={{ width: "50rem" }}>
            {this.state.username.map((item, i) => (
              <Card key={i}>
                {this.state.submissions[i] > 0 && (
                  <div>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Card.Header}
                        variant="info"
                        eventKey={i}
                        style={{ backgroundColor: "#169eb4", color: "white" }}
                      >
                        <Container>
                          <Row>
                            <Col>{this.state.username[i]}</Col>
                            <Col></Col>
                            <Col>Submissions: {this.state.submissions[i]}</Col>
                          </Row>
                        </Container>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={i}>
                      <Card.Body>
                        <Button size="sm" variant="outline-info" href={`/users/${this.state.username[i]}`}>View Recipes</Button>
                        {this.state.appetizer[i] > 0 && <Badge pill variant="info" className="m-1">Appetizer {this.state.appetizer[i]}</Badge>}
                        {this.state.breakfast[i] > 0 && <Badge pill variant="info" className="m-1">Breakfast {this.state.breakfast[i]}</Badge>}
                        {this.state.brunch[i] > 0 && <Badge pill variant="info" className="m-1">Brunch {this.state.brunch[i]}</Badge>}
                        {this.state.dessert[i] > 0 && <Badge pill variant="info" className="m-1">Dessert {this.state.dessert[i]}</Badge>}
                        {this.state.dinner[i] > 0 && <Badge pill variant="info" className="m-1">Dinner {this.state.dinner[i]}</Badge>}
                        {this.state.drink[i] > 0 && <Badge pill variant="info" className="m-1">Drink {this.state.drink[i]}</Badge>}
                        {this.state.lunch[i] > 0 && <Badge pill variant="info" className="m-1">Lunch {this.state.lunch[i]}</Badge>}
                        {this.state.snack[i] > 0 && <Badge pill variant="info" className="m-1">Snack {this.state.snack[i]}</Badge>}
                      </Card.Body>
                    </Accordion.Collapse>
                  </div>
                )}
              </Card>
            ))}
          </Accordion>
        </Container>
      </div >
    );
  }
}

export default Users;
