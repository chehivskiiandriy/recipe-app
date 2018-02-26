import React from 'react';
import classnames from 'classnames';

import IngredientCard from "./IngredientCard";

class IngredientList extends React.Component {
    render () {
        const ingredientsList = this.props.ingredients.map((item, index) =>
            <IngredientCard
                ingredient={item}
                key={index}
                removeIngredientHandler={this.props.removeIngredientHandler}/>);
        return (
            <div className={classnames('ui', 'middle', 'aligned', 'selection',
                {'horizontal': this.props.removeIngredientHandler},
                {'ordered': this.props.removeIngredientHandler}, 'list')}>
                {ingredientsList}
            </div>
        );
    }
}

export default IngredientList;