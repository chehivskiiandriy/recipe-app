import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RecipesList from './RecipesList';
import { fetchRecipes, deleteRecipe, updateRecipe } from '../store/actions/index';

class RecipesPage extends React.Component {
    static propTypes = {
        recipes: PropTypes.array.isRequired,
        fetchRecipes: PropTypes.func.isRequired,
        deleteRecipe: PropTypes.func.isRequired
    };

    componentDidMount () {
        this.props.fetchRecipes();
    }

    render () {
        return (
            <div>
                <h1>Recipes List</h1>
                <RecipesList
                    recipes={this.props.recipes}
                    deleteRecipe={this.props.deleteRecipe}
                    updateRecipe={this.props.updateRecipe}
                    url={this.props.match.url}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes
    }
};

export default connect(mapStateToProps, {fetchRecipes, deleteRecipe, updateRecipe})(RecipesPage);