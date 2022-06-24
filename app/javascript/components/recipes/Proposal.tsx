import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Details from "./Details"

const Proposal = (props) => {

  const [urlParameters, setUrlParameters] = useSearchParams();
  const filterByIngredients = urlParameters.get("filter_by_ingredients")

  let url = `/api/v1/propose_recipe.json`

  if (filterByIngredients)
    url = `/api/v1/propose_recipe.json?filter_by_ingredients=${filterByIngredients}`

  const [recipe, setRecipe] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 404) {
          alert("No recipe found!")
          return navigate("/")
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
    return <><Details recipe={recipe}></Details></>
  }
}

export default Proposal;
