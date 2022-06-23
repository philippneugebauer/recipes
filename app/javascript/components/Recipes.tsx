import React from "react";
import { Link } from "react-router-dom";
import RecipeIndexItem from "./RecipeIndexItem"

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      filter_by_ingredients: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //TODO: allow url with filter params
    const url = "/api/v1/recipes.json";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipes: response }))
      .catch(() => this.props.history.push("/"));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { filter_by_ingredients } = this.state;
    const url = `/api/v1/recipes.json?filter_by_ingredients=${filter_by_ingredients}`;

    if (filter_by_ingredients.length == 0)
      return;

    fetch(url, {
      method: "GET"
    }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
    }).then(response => this.setState({ recipes: response }))
    .catch(error => console.log(error.message));
  }

  render() {
    const { recipes } = this.state;
    const allRecipes = recipes.map((recipe) => (
      <RecipeIndexItem recipe={recipe}></RecipeIndexItem>
    ));

    return (
      <>
        <h1>Recipes
          <Link to={`/recipe_imports/new`} className="ms-2 btn btn-outline-primary" aria-label="title with link to recipe details">
            Upload new recipes
          </Link>
        </h1>

        <form onSubmit={this.handleSubmit} className="mt-4 mb-4">
          <div className="input-group">
            <input value={this.state.filter_by_ingredients} onChange={this.handleInputChange} type="text" name="filter_by_ingredients" className="form-control" aria-label="ingredient filter input" describedby="submit-filter" />
            <input type="submit" value="Propose Recipe" onSubmit={this.handleProposeSubmit} className="btn btn-outline-primary" aria-label="Propose recipe based on filter" />
            <Link to={`/`} className="btn btn-outline-primary" aria-label="reset filter">
              Reset
            </Link>
            <input type="submit" value="Filter" id="submit-filter" className="btn btn-primary" aria-describedby="filter-help" />
          </div>
          <div id="filter-help" className="form-text">Filter multiple necessary ingredients: "Corn, Flour"</div>
        </form>

        {allRecipes}
      </>
    );
  }
}
export default Recipes;
