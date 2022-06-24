import React from "react";
import HeaderWithBack from "./HeaderWithBack"
import IngredientList from "./IngredientList"
import RecipeDetails from "./RecipeDetails"

const RecipeShow = (props) => (
  <>
    <HeaderWithBack title={props.recipe.title} link={`/`} linkText={"Back to recipes"}></HeaderWithBack>

    <div className="card">
      <div className="row">
        <div className="col-6">
          <img src={props.recipe.image_url} className="img-fluid rounded" alt={`Cooked ${props.recipe.title}`}></img>
        </div>
        <div className="col-6">
          <div className="table-responsive">
            <table className="table mt-3" aria-label="table for recipes">
              <tbody>
                <tr>
                  <td>Ingredients</td>
                  <td>
                    <IngredientList ingredients={props.recipe.ingredients}></IngredientList>
                  </td>
                </tr>
                <RecipeDetails recipe={props.recipe}></RecipeDetails>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default RecipeShow;
