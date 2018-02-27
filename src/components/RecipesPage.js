import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RecipesList from './RecipesList';
import Filters from './Filters';
import { fetchRecipes, setVisibility, setSort } from '../store/actions/index';
import { SORT_BY_DATE, SORT_BY_ALPHABET, SORT_BY_VIEWS, SHOW_ALL, SHOW_LIKED, SHOW_DISLIKED } from "../shared/constant";

class RecipesPage extends React.Component {
    static propTypes = {
        recipes: PropTypes.array.isRequired,
        fetchRecipes: PropTypes.func.isRequired
    };

    componentDidMount () {
        this.props.fetchRecipes();
    }

    render () {
        const sortValues = [{name: 'By date', color: 'red', type: SORT_BY_DATE},
            {name: 'By views', color: 'purple', type: SORT_BY_VIEWS},
            {name: 'By alphabet', color: 'blue', type: SORT_BY_ALPHABET}];
        const visibilityValues = [{name: 'Show all', color: 'red', type: SHOW_ALL},
            {name: 'Show liked', color: 'purple', type: SHOW_LIKED},
            {name: 'Show disliked', color: 'blue', type: SHOW_DISLIKED}];

        return (
            <div>
                <div className="ui secondary menu">
                    <h1 className="item">Recipes List</h1>
                    <div className="right menu">
                        <div className="ui item">
                            <Filters type="Sort" values={sortValues} setFilter={this.props.setSort}/>
                        </div>
                        {this.props.match.url.includes('recipes') ? null :
                            <div className="ui item">
                                <Filters type="Filter" values={visibilityValues} setFilter={this.props.setVisibility}/>
                            </div>}
                    </div>
                </div>
                <RecipesList recipes={this.props.recipes} url={this.props.match.url}/>
            </div>
        );
    }
}

const sortByDate = (a, b) => {
    return +new Date(b.date) - +new Date(a.date)
};
const sortByViews = (a, b) => b.views - a.views;
const sortByAlphabet = (a, b) => a.title.localeCompare(b.title);

const getVisible = (filterBy, sortBy, recipes) => {
    let filtRecep = [...recipes];

    switch (filterBy) {
        case SHOW_ALL: break;
        case SHOW_LIKED: filtRecep = filtRecep.filter(t => t.liked); break;
        case SHOW_DISLIKED: filtRecep = filtRecep.filter(t => !t.liked); break;
        default: break;
    }

    switch (sortBy) {
        case SORT_BY_DATE: filtRecep = [...filtRecep.sort(sortByDate)]; break;
        case SORT_BY_VIEWS: filtRecep = [...filtRecep.sort(sortByViews)]; break;
        case SORT_BY_ALPHABET: filtRecep = [...filtRecep.sort(sortByAlphabet)]; break;
        default: break;
    }

    return filtRecep;
};

const mapStateToProps = state => {
    return {
        recipes: getVisible(state.filters.visibility, state.filters.sort, state.recipes)
    }
};

export default connect(mapStateToProps, {fetchRecipes, setVisibility, setSort})(RecipesPage);