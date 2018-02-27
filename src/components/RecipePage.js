import React from 'react';
import { connect } from 'react-redux';

import { fetchRecipe, updateRecipe } from '../store/actions/index';
import IngredientList from './IngredientList';
import './RecipePage.css';

class RecipePage extends React.Component {
    state = {
        _id: this.props.recipe ? this.props.recipe._id : null,
        title: this.props.recipe ? this.props.recipe.title : '',
        cover: this.props.recipe ? this.props.recipe.cover : '',
        description: this.props.recipe ? this.props.recipe.description : '',
        ingredients: this.props.recipe ? this.props.recipe.ingredients : [],
        date: this.props.recipe ? this.props.recipe.date : '',
        views: this.props.recipe ? this.props.recipe.views : 0,
        liked: this.props.recipe ? this.props.recipe.liked : false
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.recipe) {
            this.setState({
                _id: nextProps.recipe._id,
                title: nextProps.recipe.title,
                cover: nextProps.recipe.cover,
                description: nextProps.recipe.description,
                ingredients: nextProps.recipe.ingredients,
                date: nextProps.recipe.date,
                views: nextProps.recipe.views,
                liked: nextProps.recipe.liked
            })
        }
    };

    componentDidMount () {
        const { match } = this.props;
        if (match.params._id) {
            this.props.fetchRecipe(match.params._id);
        }
    };

    componentWillUnmount() {
        let { views } = this.state;
        views ? ++views : views = 1;
        this.props.updateRecipe({...this.state, views});
    }

    render () {
        const { title, cover, description, ingredients, date, views, liked } = this.state;
        
        return (
            <div className="RecipePage">
                <div>
                    <h1>{title}</h1>
                    <span className="Date">{(new Date(date)).toLocaleDateString()}</span>
                    <span>
                        <i className="eye icon"/>
                        <span>{views}</span>
                    </span>
                </div>
                <div className="RecipeContent">
                    <div style={{
                        backgroundImage: 'url(' + cover + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '300px'
                    }}/>
                    <div className="RightContent">
                        <p>{description}</p>
                        <IngredientList ingredients={ingredients}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    if(props.match.params._id) {
        return {
            recipe: state.recipes.find(item => item._id === props.match.params._id)
        }
    }
    return { recipe: null };
};

export default connect(mapStateToProps, { fetchRecipe, updateRecipe })(RecipePage);