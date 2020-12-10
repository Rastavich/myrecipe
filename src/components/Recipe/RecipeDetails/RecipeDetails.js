import React from "react";
import { DetailsView, ListView } from "./RecipeDetails.elements";

const RecipeDetails = (recipe) => {
  const details = recipe.recipe;

  if (details == null) {
    return "This recipe has no information...edit this recipe to add them";
  }

  const { steps } = details;

  const { ingredients } = details;

  const { nutrition } = details;

  return (
    <DetailsView>
      <h5>{details.recipe_intro}</h5>
      {ingredients != null && (
        <>
          <h4>Ingredients</h4>
          <ul>
            {ingredients.map((ingredient) => (
              <ListView key={ingredient}>
                <div>
                  <span>
                    <p>{ingredient}&nbsp;</p>
                  </span>
                </div>
              </ListView>
            ))}
          </ul>
        </>
      )}
      {steps != null && (
        <>
          <h4>Steps</h4>
          <ul>
            {steps.map((step) => (
              <ListView key={step}>{step}</ListView>
            ))}
          </ul>
        </>
      )}
      {nutrition != null && (
        <>
          <h4>Nutrition</h4>
          <ul>
            {nutrition.map((nutrients) => (
              <ListView key={nutrients}>{nutrients}</ListView>
            ))}
          </ul>
        </>
      )}
    </DetailsView>
  );
};

export default RecipeDetails;
