import React from "react";

const IndexItem = (props) => (
  <>
    <tr key={props.recipeImport.id}>
      <td>{props.recipeImport.name}</td>
      <td>{props.recipeImport.file_name}</td>
      <td>{props.recipeImport.status}</td>
      <td>{new Date(props.recipeImport.created_at).toLocaleString("de-DE")}</td>
    </tr>
  </>
)

export default IndexItem;
