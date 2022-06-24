import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeShow from "./RecipeShow"

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

  if(recipe == null) {
    return
  } else {
    return <><RecipeShow recipe={recipe}></RecipeShow></>
  }
}

export default Recipe;
