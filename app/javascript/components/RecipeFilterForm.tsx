import React from "react";
import { Link } from "react-router-dom";

const RecipeFilterForm = (title, link, linkText) => (
  <>
    <form onSubmit={this.handleSubmit} className="mt-4 mb-4">
      <div className="input-group">
        <input value={this.state.filter_by_ingredients} onChange={this.handleInputChange} type="text" name="filter_by_ingredients" className="form-control" aria-label="ingredient filter input" describedby="submit-filter" />
        <input type="submit" value="Propose Recipe" onSubmit={this.handleProposeSubmit} className="btn btn-outline-primary" aria-label="Propose recipe based on filter" />
        <Link to={`/`} className="btn btn-outline-primary" aria-label="reset filter">
          Reset
        </Link>
        <input type="submit" value="Filter" id="submit-filter" className="btn btn-primary" aria-describedby="filter-help" />
      </div>
      <div id="filter-help" className="form-text">Filter multiple necessary ingredients: e.g., "Corn, Flour"</div>
    </form>
  </>
)

export default RecipeFilterForm;
