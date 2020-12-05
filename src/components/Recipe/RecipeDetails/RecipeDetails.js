import React from "react";
import { DetailsView, ListView } from "./RecipeDetails.elements";

const RecipeDetails = (recipe) => {
  const details = recipe.recipe;

  if (details == null) {
    return "This recipe has information...edit this recipe to add them";
  }

  const { steps } = details;
  if (steps == null) {
    return "This recipe has no steps...edit this recipe to add them";
  }

  const { ingredients } = details;
  if (ingredients == null) {
    return "This recipe has no ingredients...edit this recipe to add them";
  }

  const { nutrition } = details;
  if (nutrition == null) {
    return "This recipe has no nutritional information...edit this recipe to add them";
  }

  return (
    <DetailsView>
      <h5>{details.recipe_intro}</h5>
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
      <h4>Steps</h4>
      <ul>
        {steps.map((step) => (
          <ListView key={step}>{step}</ListView>
        ))}
      </ul>
      <h4>Nutrition</h4>
      <ul>
        {nutrition.map((nutrients) => (
          <ListView key={nutrients}>{nutrients}</ListView>
        ))}
      </ul>
    </DetailsView>
  );
};

export default RecipeDetails;
