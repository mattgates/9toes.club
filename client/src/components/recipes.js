import React from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: [],
            author: [],
            type: [],
            date: [],
            submittedBy: [],
            _id: []
        };
    }   

    getRecipes = async () => {
        const response = await fetch('/api/posts/recipes');
        const data = await response.json();
        for (let index = 0; index < data.length; index++) {
            this.setState({
                title: [...this.state.title, data[index].title],
                author: [...this.state.author, data[index].author],
                _id: [...this.state._id, data[index]._id],
                type: [...this.state.type, data[index].type],
                date: [...this.state.date, data[index].date],
                submittedBy: [...this.state.submittedBy, data[index].submittedBy]
            }); 
        }
    }

    componentDidMount(){
        this.getRecipes();
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state._id.map((item, i) => (
                        <NavLink to={`/users/${this.state.submittedBy[i]}/${this.state._id[i]}`} key={item}>
                            <li>{this.state.title[i]} ({this.state.type[i]}) by {this.state.author[i]}</li>
                        </NavLink>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Recipes;
