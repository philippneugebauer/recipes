import React from "react";
import { Link, useParams } from "react-router-dom";

const RecipeImport = () => {

  let { id } = useParams()

  return (
    <div>
      <h2>Item ID: {id}</h2>
    </div>
  )

}

export default RecipeImport;
