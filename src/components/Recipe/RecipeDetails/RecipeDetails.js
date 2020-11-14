import React from "react";
import { DetailsView, ListView } from "./RecipeDetails.elements";

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
          <ListView key={step.stepNum}>
            {step.stepNum}: {step.stepDesc}
          </ListView>
        ))}
      </ul>
      <ul>
        {ingredients.map((ingredient) => (
          <ListView key={ingredient.name}>
            <div>
              <span>
                <p>
                  {ingredient.qty}&nbsp;
                  {ingredient.name}
                </p>
              </span>
            </div>
          </ListView>
        ))}
      </ul>
    </DetailsView>
  );
};

export default RecipeDetails;
