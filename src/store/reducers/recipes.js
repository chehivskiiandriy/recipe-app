import * as actionTypes from '../actions/actionTypes';

const reducer = (state = [], action = {}) => {
    switch (action.type) {
        case actionTypes.SET_RECIPES:
            return action.recipes;
        case actionTypes.ADD_RECIPE:
            return [
                ...state,
                action.recipe
            ];
        case actionTypes.RECIPE_FETCHED:
            const index = state.findIndex(item => item._id === action.recipe._id);
            if(index > -1) {
                return state.map(item => {
                    if(item._id === action.recipe._id) return action.recipe;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.recipe
                ]
            }
        case actionTypes.RECIPE_UPDATED:
            return state.map(item => {
                if(item._id === action.recipe._id) return action.recipe;
                return item;
            });
        case actionTypes.RECIPE_DELETED:
            return state.filter(item => item._id !== action.id);
        default: return state;
    }
};

export default reducer;