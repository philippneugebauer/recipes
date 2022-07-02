import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FilterForm = (props) => {

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
        <input value={filterByIngredients} onChange={changeHandler} type="text" className="form-control border-end-0" name="filter_by_ingredients" aria-label="ingredient filter input" describedby="submit-filter" />
        <div className="d-flex align-items-center border-top border-bottom icon-button__border-color pe-2" role="button" onClick={resetHandler} aria-label="reset filter">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-danger bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
          </svg>
        </div>
        <a onClick={proposeSubmitHandler} className="btn btn-outline-primary" aria-label="Propose recipe based on filter">Propose</a>
        <input type="submit" value="Filter" id="submit-filter" className="btn btn-primary" aria-describedby="filter-help" />
      </div>
      <div id="filter-help" className="form-text">Filter multiple necessary ingredients: e.g., "Corn, Flour"</div>
    </form>
  )
}

export default FilterForm;
