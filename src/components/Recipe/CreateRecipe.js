import React, { useState, useEffect } from "react";
import { createRecipe } from "../../services/RecipeService";
import { ClapSpinner } from "react-spinners-kit";
import {} from "./CreateRecipe.elements";
import { useForm } from "react-hook-form";

export default function CreateRecipe() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    createRecipe(data)
      .then((response) => {
        this.success = response;
      })
      .catch((error) => {
        this.error = error.status;
      })
      .finally(() => {});
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="recipeName"
        placeholder="Recipe Name"
        ref={register({ required: true, maxLength: 20 })}
      />
      {errors.recipeName && <span>This field is required</span>}
      <input
        name="categoryName"
        placeholder="Category Name"
        ref={register({ maxLength: 20 })}
      />
      <input
        name="recipeIntro"
        placeholder="Recipe Intro"
        ref={register({ maxLength: 50 })}
      />
      <input
        name="prepTime"
        placeholder="Preparation Time"
        ref={register({ required: true, maxLength: 10 })}
      />
      {errors.prepTime && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
}

// clearSuccess() {
//   this.success = "";
// },
// addNewStep() {
//   this.recipe.steps.push({ stepNum: this.index, stepDesc: this.step });
//   this.step = "";
// },
// deleteStep(index) {
//   this.recipe.steps.splice(index, 1);
// },
// addNewIngredient() {
//   this.recipe.ingredients.push({
//     name: this.ingredient,
//     qty: this.ingredient_qty,
//   });
//   this.ingredient = "";
//   this.ingredient_qty = "";
// },
// deleteIngredient(index) {
//   this.recipe.ingredients.splice(index, 1);
// },
// },
