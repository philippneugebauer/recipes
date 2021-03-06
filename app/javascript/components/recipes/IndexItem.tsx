import React from "react";
import { Link } from "react-router-dom";
import IngredientList from "./IngredientList"
import DetailsTable from "./DetailsTable"

const IndexItem = (props) => {
  const image = props.recipe.image_thumbnail != null ? props.recipe.image_thumbnail : props.recipe.image_url
  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4 card-body">
            <img src={image} className="rounded float-end recipe-index__item--image" alt={`Cooked ${props.recipe.title}`}></img>
            <div className="card-img-overlay">
              <h2 className="card-title h5">
                <Link to={`/recipes/${props.recipe.id}`} aria-label="title with link to recipe details">
                  {props.recipe.title}
                </Link>
              </h2>
            </div>
          </div>
          <div className="col-md-4 border-start my-card-border-color card-body">
            <table className="table table-borderless" aria-label="table for recipe details">
              <tbody>
                <DetailsTable recipe={props.recipe}></DetailsTable>
              </tbody>
            </table>
          </div>
          <div className="col-md-4 border-start my-card-border-color card-body">
            <IngredientList ingredients={props.recipe.ingredients}></IngredientList>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexItem;
