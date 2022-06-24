import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Details from "./Details"

const Show = (props) => {

  let { id } = useParams()

  const url = `/api/v1/recipes/${id}.json`;

  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    async function fetchData() {
      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
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

export default Show;
