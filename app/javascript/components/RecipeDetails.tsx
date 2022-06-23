import React from "react";

const RecipeDetails = (props: { recipe: any }) => (
  <>
    <tr>
      <td>Cook time</td>
      <td>{props.recipe.cook_time}</td>
    </tr>
    <tr>
      <td>Prep time</td>
      <td>{props.recipe.prep_time}</td>
    </tr>
    <tr>
      <td>Ratings</td>
      <td>{props.recipe.ratings}</td>
    </tr>
    <tr>
      <td>Author</td>
      <td>{props.recipe.author}</td>
    </tr>
    <tr>
      <td>Category</td>
      <td>{props.recipe.category}</td>
    </tr>
  </>
)

export default RecipeDetails;
