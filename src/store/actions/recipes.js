import * as actionTypes from './actionTypes';

function handleResponse(response) {
    if(response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export const setRecipes = (recipes) => {
    return {
        type: actionTypes.SET_RECIPES,
        recipes
    }
};

export const addRecipe = (recipe) => {
    return {
        type: actionTypes.ADD_RECIPE,
        recipe
    }
};

export const recipeFetched = (recipe) => {
    return {
        type: actionTypes.RECIPE_FETCHED,
        recipe
    }
};

export function recipeUpdated(recipe) {
    return {
        type: actionTypes.RECIPE_UPDATED,
        recipe
    }
}

export function recipeDeleted(id) {
    return {
        type: actionTypes.RECIPE_DELETED,
        id
    }
}

export const fetchRecipes = () => {
    return dispatch => {
        fetch('/api/recipes')
            .then(res => res.json())
            .then(data => dispatch(setRecipes(data.recipes)));
    }
};

export const fetchRecipe = (id) => {
    return dispatch => {
        fetch(`/api/recipes/${id}`)
            .then(res => res.json())
            .then(data => dispatch(recipeFetched(data.recipe)));
    }
};

export const saveRecipe = (data) => {
    return dispatch => {
        return fetch('/api/recipes', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(data => dispatch(addRecipe(data.recipe)));
    }
};

export const updateRecipe = (data) => {
    return dispatch => {
        return fetch(`/api/recipes/${data._id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(recipeUpdated(data.recipe)));
    }
};

export const deleteRecipe = (id) => {
    return dispatch => {
        return fetch(`/api/recipes/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(() => dispatch(recipeDeleted(id)));
    }
};
