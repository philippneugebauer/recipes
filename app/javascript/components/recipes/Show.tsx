import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Details from "./Details"

const Show = (props) => {

  let { id } = useParams()

  const url = `/api/v1/recipes/${id}.json`;

  const [recipe, setRecipe] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status == 404) {
          alert("No recipe found!")
          return navigate("/")
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
