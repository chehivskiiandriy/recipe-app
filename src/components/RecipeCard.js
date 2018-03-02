import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import './RecipeCard.css';
import { updateRecipe, deleteRecipe } from "../store/actions";

class RecipeCard extends React.Component {
    static propTypes = {
        recipe: PropTypes.object.isRequired,
        deleteRecipe: PropTypes.func.isRequired
    };

    static colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];

    likeHandler = () => {
        this.props.updateRecipe({...this.props.recipe, liked: !this.props.recipe.liked})
    };

    render () {
        const { recipe, url } = this.props;
        const color = RecipeCard.colors[recipe.description.length % RecipeCard.colors.length];

        return (
            <div className={'ui card RecipeCard ' + color}>
                <Link to={`/recipe/${recipe._id}`} className="image CardImage">
                    <img src={recipe.cover} alt="Recipe Cover"/>
                </Link>
                {url.includes('recipes') ? null : <div className="Like" onClick={this.likeHandler}>
                    <i className={classnames('big', 'heart', 'icon', 'FixedHeart', { ActiveHeart: recipe.liked } )}/>
                </div> }
                <Link to={`/recipe/${recipe._id}`} className="content CardContent">
                    <div className="header">{recipe.title}</div>
                    <div className="meta">
                        <span>{(new Date(recipe.date)).toLocaleDateString()}</span>
                        <span className="right floated">
                        <i className="eye icon"/>
                        <span>{recipe.views}</span>
                    </span>
                    </div>
                    <div className="description">
                        <p>{recipe.description}</p>
                    </div>
                </Link>
                {url.includes('recipes') ?
                    <div className="extra content">
                        <div className="ui two buttons">
                            <Link to={`/recipe/edit/${recipe._id}`} className="ui basic button green">Edit</Link>
                            <div className="ui basic button red" onClick={() => this.props.deleteRecipe(recipe._id)}>Delete</div>
                        </div>
                    </div> : null}
            </div>
        );
    }
}

export default connect(null, {updateRecipe, deleteRecipe})(RecipeCard);