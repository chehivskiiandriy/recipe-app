import React from 'react';
import PropTypes from 'prop-types';

import RecipeCard from './RecipeCard';

const recipesList = ({recipes, deleteRecipe, updateRecipe, url}) => {
    const emptyMessage = (
        <p>There are no recipes yet in your collection.</p>
    );

    const recipesList = (
        <div className="ui link doubling stackable four centered cards">
            { recipes.map( recipe =>
                <RecipeCard
                    recipe={recipe}
                    key={recipe._id}
                    deleteRecipe={deleteRecipe}
                    updateRecipe={updateRecipe}
                    url={url}/>) }
        </div>
    );

    return (
        <div>
            {recipes.length === 0 ? emptyMessage : recipesList}
        </div>
    );
};

recipesList.propTypes = {
    recipes: PropTypes.array.isRequired,
    deleteRecipe: PropTypes.func.isRequired
};

export default recipesList;