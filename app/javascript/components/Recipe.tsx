import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderWithBack from "./HeaderWithBack"
import IngredientList from "./IngredientList"
import RecipeDetails from "./RecipeDetails"

const Recipe = (props) => {

  let { id } = useParams()

  const url = `/api/v1/recipes/${id}.json`;

  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    async function fetchData() {
      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => { setRecipe(response) })
    }
    fetchData()
  }, [])

  console.log(recipe)

  if(recipe == null) {
    return
  } else {
    return (
      <>
        <HeaderWithBack title={recipe.title} link={`/`} linkText={"Back to recipes"}></HeaderWithBack>

        <div className="row">
          <div className="col-6">
            <img src={recipe.image_url} className="img-fluid rounded" alt={`Cooked ${recipe.title}`}></img>
          </div>
          <div className="col-6">
            <div className="table-responsive">
              <table className="table mt-3" aria-label="table for recipes">
                <tbody>
                  <tr>
                    <td>Ingredients</td>
                    <td>
                      <IngredientList ingredients={recipe.ingredients}></IngredientList>
                    </td>
                  </tr>
                  <RecipeDetails recipe={recipe}></RecipeDetails>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Recipe;
