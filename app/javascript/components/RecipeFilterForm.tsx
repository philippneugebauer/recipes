import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RecipeFilterForm = (props) => {

  const [filterByIngredients, setFilterByIngredients] = useState('')

  const navigate = useNavigate();

  const proposeSubmitHandler = (event) => {
    event.preventDefault();

    let url = `/propose_recipe`

    if (filterByIngredients)
      url = `/propose_recipe?filter_by_ingredients=${encodeURIComponent(filterByIngredients)}`

    return navigate(url);
  }

  const changeHandler = (event) => {
    setFilterByIngredients(event.target.value)
  }

  const submitHandler = (event) => {
    event.preventDefault()

  if (filterByIngredients.length == 0)
    return
  else
    return props.populateData({url: `/api/v1/recipes.json?filter_by_ingredients=${encodeURIComponent(filterByIngredients)}`})
  }

  const resetHandler = (event) => {
    event.preventDefault()

    setFilterByIngredients('')

    return props.populateData({})
  }

  return (
    <form onSubmit={submitHandler} className="mt-4 mb-1">
      <div className="input-group">
        <input value={filterByIngredients} onChange={changeHandler} type="text" className="form-control" aria-label="ingredient filter input" describedby="submit-filter" />
        <input type="submit" value="Propose Recipe" onClick={proposeSubmitHandler} className="btn btn-outline-primary" aria-label="Propose recipe based on filter" />
        <input type="submit" value="Reset" onClick={resetHandler} className="btn btn-outline-primary" aria-label="reset filter" />
        <input type="submit" value="Filter" id="submit-filter" className="btn btn-primary" aria-describedby="filter-help" />
      </div>
      <div id="filter-help" className="form-text">Filter multiple necessary ingredients: e.g., "Corn, Flour"</div>
    </form>
  )
}

export default RecipeFilterForm;
