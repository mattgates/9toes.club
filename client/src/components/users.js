import React from 'react';
import { NavLink } from 'react-router-dom';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: [],
            submitted: [],
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
        const response = await fetch('/api/users/list');
        const data = await response.json();
        for (let index = 0; index < data.length; index++) {
            this.setState({
                username: [...this.state.username, data[index].username],
                submitted: [...this.state.submitted, data[index].submitted],
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
    }

    componentDidMount(){
        this.getUsers();
    }
    render() {
        return (
            <div>
                <h1>here</h1>
                <ul>
                    {this.state.username.map((item, i) => (
                        <NavLink to={`/users/${this.state.username[i]}`} key={item}>
                            <li>{this.state.username[i]} ({this.state.submitted[i]})</li>
                        </NavLink>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Users;
