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
      <h4>Ingredients</h4>
      <ul>
        {ingredients.map((ingredient) => (
          <ListView key={ingredient}>
            <div>
              <span>
                
                <p>
                  {ingredient}&nbsp;
                  
                </p>
              </span>
            </div>
          </ListView>
        ))}
      </ul>
      <h4>Steps</h4>
      <ul>
        {steps.map((step) => (
          <ListView>
            {steps}
          </ListView>
        ))}
      </ul>
    </DetailsView>
  );
};

export default RecipeDetails;
