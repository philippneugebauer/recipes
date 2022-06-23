import * as React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./components/Recipes";
import Recipe from "./components/Recipe";
import RecipeImport from "./components/RecipeImport";

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Recipes /> } />
      <Route path="recipes/:id" element={ <Recipe /> } />
      <Route path="recipes" element={ <Recipes /> } />
      <Route path="recipe_imports/:id" element={ <RecipeImport /> } />
    </Routes>
  </BrowserRouter>
);