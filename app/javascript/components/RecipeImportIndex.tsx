import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecipeImportIndexItem from "./RecipeImportIndexItem"

const RecipeImportIndex = () => {

  const [recipeImports, setRecipeImports] = useState([])

  const populateData = () => {
    let url = "/api/v1/recipe_imports.json"

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setRecipeImports(response))
  }

  useEffect(() => {
    populateData()
  }, [])

  const allRecipeImports = recipeImports.map((recipeImport) => (
    <RecipeImportIndexItem recipeImport={recipeImport}></RecipeImportIndexItem>
  ));

  return (
    <>
      <div className="card p-3 mb-3">
        <h1> Recipe imports
          <Link to={`new`} className="ms-2 btn btn-outline-primary">
            Upload new recipes
          </Link>
          <Link to={`/`} className="ms-2 btn btn-outline-secondary">
            Back to recipes
          </Link>
        </h1>
      </div>

      <div className="card p-3">
        <div className="table-responsive">
          <table className="table table-hover" aria-label="table for recipe imports">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">File</th>
                <th scope="col">Status</th>
                <th scope="col">Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {allRecipeImports}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default RecipeImportIndex;
