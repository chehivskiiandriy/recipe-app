import React from 'react';
import classnames from 'classnames';

import IngredientList from '../IngredientList';
import './RecipeForm.css';

class RecipeForm extends React.Component {
    state = {
        _id: this.props.recipe ? this.props.recipe._id : null,
        title: this.props.recipe ? this.props.recipe.title : '',
        cover: this.props.recipe ? this.props.recipe.cover : '',
        description: this.props.recipe ? this.props.recipe.description : '',
        ingredients: this.props.recipe ? this.props.recipe.ingredients : [],
        date: this.props.recipe ? this.props.recipe.date : '',
        views: this.props.recipe ? this.props.recipe.views : 0,
        liked: this.props.recipe ? this.props.recipe.liked : false,
        newIngredient: '',
        errors: {},
        loading: false
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


    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({[e.target.name]: e.target.value});
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        //validation
        let errors = {};
        if (this.state.title === '') errors.title = "Can't be empty";
        if (this.state.cover === '') errors.cover = "Can't be empty";
        if (this.state.description === '') errors.description = "Can't be empty";
        if (!this.state.ingredients) errors.ingredients = "Can't be empty";

        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            const { _id, title, cover, description, ingredients, views, liked } = this.state;
            const date = new Date();
            this.setState({loading: true});
            this.props.saveRecipe({ _id, title, cover, description, ingredients, views, date, liked })
                .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
        }
    };

    addIngredientHandler = () => {
        let ings;

        if(!this.state.ingredients) {
            ings = []
        } else {
            ings = [...this.state.ingredients]
        }

        if(this.state.newIngredient) {
            if (!!this.state.errors.ingredients) {
                let errors = Object.assign({}, this.state.errors);
                delete errors.ingredients;
                this.setState({
                    ingredients: ings.concat(this.state.newIngredient),
                    newIngredient: '',
                    errors
                });
            } else {
                this.setState({
                    ingredients: ings.concat(this.state.newIngredient),
                    newIngredient: ''
                })
            }
        }
    };

    removeIngredientHandler = (ingredient) => {
        this.setState({ingredients: this.state.ingredients.filter(item => item !== ingredient)});
    };

    handleKeyPress = (e) =>{
        if(e.charCode === 13){
            console.log('Enter clicked!!!');
            e.preventDefault();
            this.addIngredientHandler();
        }
    };

    render() {
        const form = (
            <form className={classnames('ui', 'form', 'RecipeForm', {loading: this.state.loading})} onSubmit={this.handleSubmit}>
                <h1>{this.state._id ? 'Edit recipe' : 'Add new recipe'}</h1>

                {!!this.state.errors.global &&
                <div className="ui negative message"><p>{this.state.errors.global}</p></div>}

                <div className={classnames('field', {error: !!this.state.errors.title})}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        id="title"/>
                    <span>{this.state.errors.title}</span>
                </div>

                <div className={classnames('field', {error: !!this.state.errors.cover})}>
                    <label htmlFor="cover">Cover URL</label>
                    <input
                        type="text"
                        name="cover"
                        value={this.state.cover}
                        onChange={this.handleChange}
                        id="cover"/>
                    <span>{this.state.errors.cover}</span>
                </div>

                <div className="field">
                    {this.state.cover !== '' &&
                    <img src={this.state.cover} alt="cover" className="ui small bordered image"/>}
                </div>

                <div className={classnames('field', {error: !!this.state.errors.description})}>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        id="description"/>
                    <span>{this.state.errors.description}</span>
                </div>

                <div className={classnames('field', {error: !!this.state.errors.ingredients})}>
                    <label htmlFor="newIngredient">Ingredients</label>
                    <div className="ui card NewIngredientCard">
                        <div className="AddHeader">
                            <i className="big plus square outline icon" id="add" onClick={this.addIngredientHandler}/>
                            <label htmlFor="add" onClick={this.addIngredientHandler}>Add Ingredient</label>
                            <input
                                type="text"
                                name="newIngredient"
                                value={this.state.newIngredient}
                                onChange={this.handleChange}
                                onKeyPress={this.handleKeyPress}
                                className="NewIngredientInput"
                                id="newIngredient"/>
                        </div>
                        <div className="IngredientsList">
                            { this.state.ingredients ? <IngredientList ingredients={this.state.ingredients} removeIngredientHandler={this.removeIngredientHandler}/> : null }
                        </div>
                    </div>
                    <span>{this.state.errors.ingredients}</span>
                </div>

                <div className="field">
                    <button className="ui primary button">Save</button>
                </div>
            </form>
        );

        return (
            <div>
                { form }
            </div>
        );
    }
}

export default RecipeForm;