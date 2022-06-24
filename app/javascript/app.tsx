import * as React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import RecipeImportIndex from "./components/RecipeImportIndex";
import RecipeProposal from "./components/RecipeProposal"

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Recipes /> } />
      <Route path="propose_recipe" element={ <RecipeProposal />} />
      <Route path="recipes/:id" element={ <Recipe /> } />
      <Route path="recipes" element={ <Recipes /> } />
      <Route path="recipe_imports" element={ <RecipeImportIndex /> } />
    </Routes>
  </BrowserRouter>
);
