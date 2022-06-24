import React from "react";

const RecipeImportIndexItem = (props) => (
  <>
    <tr key={props.recipeImport.id}>
      <td>{props.recipeImport.name}</td>
      <td>{props.recipeImport.file_name}</td>
      <td>{props.recipeImport.created_at}</td>
    </tr>
  </>
)

export default RecipeImportIndexItem;
