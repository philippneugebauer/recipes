import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const RecipeImportNew = (props) => {

  const [name, setName] = useState('')
  const [file, setFile] = useState()

  const [response, setResponse] = useState({})

  const nameChangeHandler = (event) => {
    setName(event.target.value)
  }

  const fileChangeHandler = (event) => {
    setFile(event.target.files[0])
  }

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault()

    const csrfToken = document.querySelector('[name=csrf-token]').content

    const formData = new FormData()
    formData.append('name', name)
		formData.append('file', file)

    const requestOptions = {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': csrfToken
      },
      body: formData
    }

    fetch('/api/v1/recipe_imports.json', requestOptions)
      .then(response => setResponse(response))

    if (response.ok) {
      //TODO: only happens after second button press => timeout/wait?
      return navigate("/recipe_imports")
    } else {
      //TODO: display errors?
    }
  }

  return (
    <>
      <div className="card p-3 mb-3">
        <h1>Upload New Recipes</h1>
      </div>

      <div className="card p-3">
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input onChange={nameChangeHandler} value={name} type="text" className="form-control" id="name" name="name" />
          </div>

          <div className="mb-3">
            <label htmlFor="file" className="form-label">File</label>
            <input onChange={fileChangeHandler} type="file" accept="application/JSON" className="form-control" id="file" name="file" aria-describedby="upload-help" />
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
