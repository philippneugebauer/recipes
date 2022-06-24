import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeIndexItem from "./RecipeIndexItem"
import RecipeFilterForm from "./RecipeFilterForm"

const Recipes = () => {
  //TODO: direct link with params should be possible
  //TODO: propose and reset from filter form do not work

  const [recipes, setRecipes] = useState([])

  const populateData = (props) => {
    let url = "/api/v1/recipes.json"
    if (props.url) { url = props.url }

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setRecipes(response))
  }

  useEffect(() => {
    populateData({})
  }, [])

  const allRecipes = recipes.map((recipe) => (
    <RecipeIndexItem recipe={recipe}></RecipeIndexItem>
  ));

  return (
    <>
      <div className="card px-3 py-2 mb-3">
        <h1>Recipes
          <Link to={`/recipe_imports/new`} className="ms-2 btn btn-outline-primary" aria-label="title with link to recipe details">
            Upload new recipes
          </Link>
        </h1>

        <RecipeFilterForm populateData={populateData}></RecipeFilterForm>
      </div>

      {allRecipes}
    </>
  )
}
export default Recipes;
