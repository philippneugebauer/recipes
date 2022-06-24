import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import IndexItem from "./IndexItem"
import FilterForm from "./FilterForm"

const Index = () => {
  const [recipes, setRecipes] = useState([])

  const [urlParameters, setUrlParameters] = useSearchParams();
  const filterByIngredients = urlParameters.get("filter_by_ingredients")

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
    let url = "/api/v1/recipes.json"
    if (filterByIngredients) url = `/api/v1/recipes.json?filter_by_ingredients=${encodeURIComponent(filterByIngredients)}`
    populateData({url: url})
  }, [])

  const allRecipes = recipes.map((recipe) => (
    <IndexItem recipe={recipe}></IndexItem>
  ));

  return (
    <>
      <div className="card px-3 py-2 mb-3">
        <h1>Recipes
          <Link to={`/recipe_imports/new`} className="ms-2 btn btn-outline-primary" aria-label="title with link to recipe details">
            Upload new recipes
          </Link>
        </h1>

        <FilterForm populateData={populateData}></FilterForm>
      </div>

      {allRecipes.length == 0 ?
        <div className="alert alert-warning" role="alert">
          No recipes found!
        </div>
        : allRecipes}
    </>
  )
}
export default Index;
