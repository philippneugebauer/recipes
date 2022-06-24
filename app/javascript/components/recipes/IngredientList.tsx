import React from "react";

const IngredientList = (props) => (
  <>
    <ul aria-label="ingredient list">
      {props.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
    </ul>
  </>
)

export default IngredientList;
