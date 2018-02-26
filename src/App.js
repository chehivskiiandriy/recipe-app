import React, {Component} from 'react';
import { NavLink, Route } from 'react-router-dom';

import './App.css';
import RecipesPage from './components/RecipesPage';
import RecipePage from './components/RecipePage';
import RecipeFormPage from './components/RecipeFormPage';

class App extends Component {
    render() {
        return (
            <div className="ui container">
                <div className="ui three item menu nav">
                    <NavLink className="item" activeClassName="active" exact to="/">Home</NavLink>
                    <NavLink className="item" activeClassName="active" exact to="/recipes">Recipes</NavLink>
                    <NavLink className="item" activeClassName="active" exact to="/recipes/new">Add New Recipe</NavLink>
                </div>

                <Route path="/recipes" exact component={RecipesPage}/>
                <Route path="/recipes/new" component={RecipeFormPage}/>
                <Route path="/recipe/edit/:_id" component={RecipeFormPage}/>
                <Route path="/recipe/:_id" exact component={RecipePage}/>
                <Route path="/" exact component={RecipesPage}/>
            </div>
        );
    }
}

export default App;
