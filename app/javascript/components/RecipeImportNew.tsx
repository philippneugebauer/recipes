import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

const RecipeImportNew = (props) => {

  const [formState, setFormState] = useState({})

  const changeHandler = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    })
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content

    //TODO: read json document?!
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken
      },
      body: JSON.stringify(formState)
    }

    fetch('/api/v1/recipe_imports.json', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => alert(response))

    //TODO: redirect to /recipe_imports in successful sent
  }

  //TODO: add validation

  return (
    <>
      <div className="card p-3 mb-3">
        <h1>Upload New Recipes</h1>
      </div>

      <div className="card p-3">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input onChange={changeHandler} type="text" className="form-control" id="name" name="name" />
          </div>

          <div className="mb-3">
            <label htmlFor="file" className="form-label">File</label>
            <input onChange={changeHandler} type="file" accept="application/JSON" className="form-control" id="file" name="file" aria-describedby="upload-help" />
            <div id="upload-help" className="form-text">Must be a JSON file</div>
          </div>

          <div>
            <input type="submit" value="Import" className="btn btn-primary" />
            <Link to={`/recipe_imports`} className="ms-2 btn btn-outline-secondary">
              Back to recipe imports
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default RecipeImportNew;
