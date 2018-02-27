import * as actionTypes from '../actions/actionTypes';
import { SHOW_ALL, SORT_BY_DATE} from '../../shared/constant';

const initialState = {
    visibility: SHOW_ALL,
    sort: SORT_BY_DATE
};

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actionTypes.SET_VISIBILITY:
            return {
                ...state,
                visibility: action.visibility
            };
        case actionTypes.SET_SORT:
            return {
                ...state,
                sort: action.sort
            };
        default: return state;
    }
};

export default reducer;