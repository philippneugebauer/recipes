import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import RecipeShow from "./RecipeShow"

const RecipeProposal = (props) => {

  const [urlParameters, setUrlParameters] = useSearchParams();
  const filterByIngredients = urlParameters.get("filter_by_ingredients")

  let url = `/api/v1/propose_recipe.json`

  if (filterByIngredients)
    url = `/api/v1/propose_recipe.json?filter_by_ingredients=${filterByIngredients}`

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

  if(recipe == null) {
    return
  } else {
    return <><RecipeShow recipe={recipe}></RecipeShow></>
  }
}

export default RecipeProposal;
