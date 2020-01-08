import React from 'react';
import '../App.css';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            type: '',
            date: '',
            prepTime: '',
            cookTime: '',
            ingredients: [],
            instructions: [],
            submittedBy: ''
        };
    }   

    async componentDidMount(){
    
        const url = "/api/posts/recipe?_id=" + this.props.match.params.id;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            title: data.title,
            author: data.author,
            date: data.date,
            prepTime: data.prepTime,
            cookTime: data.cookTime,
            type: data.type,
            ingredients: data.ingredients,
            instructions: data.instructions,
            submittedBy: data.submittedBy
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <h3>A {this.state.type} by {this.state.author} submitted by {this.state.submittedBy}</h3>
                <h5>Prep Time: {this.state.prepTime}</h5>
                <h5>Cook Time: {this.state.cookTime}</h5>
                <h5>Ingredients</h5>
                <ul>
                    {this.state.ingredients.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
                <h5>Instructions</h5>
                <ul>
                    {this.state.instructions.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Recipe;
