import React from "react";
import { DetailsView } from "./RecipeDetails.elements";

const RecipeDetails = (recipe) => {
  const details = recipe.recipe;

  if (details == null) {
    return "This recipe has no steps or ingredients...edit this recipe to add them";
  }

  const { steps } = details;
  if (steps == null) {
    return "This recipe has no steps...edit this recipe to add them";
  }

  const { ingredients } = details;
  if (ingredients == null) {
    return "This recipe has no ingredients...edit this recipe to add them";
  }

  return (
    <DetailsView>
      <ul>
        {steps.map((step) => (
          <li key={step.stepNum}>
            {step.stepNum}: {step.stepDesc}
          </li>
        ))}
      </ul>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.name}>
            Name: {ingredient.name}
            Qty: {ingredient.qty}
          </li>
        ))}
      </ul>
    </DetailsView>
  );
};

export default RecipeDetails;
