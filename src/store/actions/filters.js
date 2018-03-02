import * as actionTypes from './actionTypes';

export const setVisibility = visibility => {
    return {
        type: actionTypes.SET_VISIBILITY,
        visibility
    }
};

export const setSort = sort => {
    return {
        type: actionTypes.SET_SORT,
        sort
    }
};

export const resetFilters = () => {
    return {
        type: actionTypes.RESET_FILTERS
    }
};