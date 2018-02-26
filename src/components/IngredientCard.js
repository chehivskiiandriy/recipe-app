import React from 'react';

const ingredientCard = ({ingredient, removeIngredientHandler}) => {
    return (
        <div className="item">
            { removeIngredientHandler
                ? <i className="trash alternate outline icon" onClick={() => removeIngredientHandler(ingredient)}/>
                : <i className="circle outline icon" /> }
            <div className="content">
                <div className="header">{ingredient}</div>
            </div>
        </div>
    );
};

export default ingredientCard;