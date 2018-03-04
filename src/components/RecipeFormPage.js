import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveRecipe, fetchRecipe, updateRecipe } from '../store/actions/index';

import RecipeForm from './RecipeForm/RecipeForm';

class RecipeFormPage extends React.Component {
    state = {
        redirect: false
    };

    componentDidMount = () => {
        if(this.props.match.params._id) {
            this.props.fetchRecipe(this.props.match.params._id);
        }
    };

    saveRecipe = ({ _id, title, cover, description, ingredients, views, date }) => {
        if(_id) {
            return this.props.updateRecipe({ _id, title, cover, description, ingredients, views, date }).then(
                () => {this.setState({redirect: true})},
            );
        } else {
            return this.props.saveRecipe({ title, cover, description, ingredients, views, date }).then(
                () => {this.setState({redirect: true})},
            );
        }
    };

    render () {
        return (
            <div>
                {this.state.redirect
                    ? <Redirect to="/recipes" />
                    : <RecipeForm
                    recipe={this.props.recipe}
                    saveRecipe={this.saveRecipe}/>
                }
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

export default connect(mapStateToProps, {saveRecipe, fetchRecipe, updateRecipe })(RecipeFormPage);