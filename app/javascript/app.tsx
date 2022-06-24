import * as React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import RecipeProposal from "./components/RecipeProposal"
import RecipeImportIndex from "./components/RecipeImportIndex";
import RecipeImportNew from "./components/RecipeImportNew";

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Recipes /> } />
      <Route path="propose_recipe" element={ <RecipeProposal />} />
      <Route path="recipes/:id" element={ <Recipe /> } />
      <Route path="recipes" element={ <Recipes /> } />
      <Route path="recipe_imports/new" element={ <RecipeImportNew /> } />
      <Route path="recipe_imports" element={ <RecipeImportIndex /> } />
    </Routes>
  </BrowserRouter>
);
