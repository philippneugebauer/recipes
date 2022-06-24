import * as React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeIndex from "./components/recipes/Index";
import RecipeShow from "./components/recipes/Show";
import RecipeProposal from "./components/recipes/Proposal"
import RecipeImportIndex from "./components/recipe_imports/Index";
import RecipeImportNew from "./components/recipe_imports/New";

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <RecipeIndex /> } />
      <Route path="propose_recipe" element={ <RecipeProposal />} />
      <Route path="recipes/:id" element={ <RecipeShow /> } />
      <Route path="recipes" element={ <RecipeIndex /> } />
      <Route path="recipe_imports/new" element={ <RecipeImportNew /> } />
      <Route path="recipe_imports" element={ <RecipeImportIndex /> } />
    </Routes>
  </BrowserRouter>
);
