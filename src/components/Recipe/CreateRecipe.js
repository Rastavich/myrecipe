import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRecipe } from "../../services/RecipeService";
import { ClapSpinner } from "react-spinners-kit";
import {} from "./CreateRecipe.elements";
import { useForm } from "react-hook-form";
import ListForm from "../Form/ListForm";

export default function CreateRecipe() {
  const { register, handleSubmit, watch, errors } = useForm();

  const onRecipeSubmit = (data) => {
    console.log(data);
    console.log(watch("example"));
    createRecipe(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  return (
    <form onSubmit={handleSubmit(onRecipeSubmit)}>
      <input
        name="recipe_name"
        placeholder="Recipe Name"
        ref={register({ required: true, maxLength: 20 })}
      />
      {errors.recipe_name && <span>This field is required</span>}
      <input
        name="category_name"
        placeholder="Category Name"
        ref={register({ maxLength: 20 })}
      />
      <input
        name="recipe_intro"
        placeholder="Recipe Intro"
        ref={register({ maxLength: 50 })}
      />
      <input
        name="prep_time"
        placeholder="Preparation Time"
        ref={register({ maxLength: 10 })}
      />
      <input
        name="total_time"
        placeholder="Total Time"
        ref={register({ required: true, maxLength: 10 })}
      />
      <input
        name="difficulty"
        placeholder="Difficulty"
        type="number"
        ref={register({ maxLength: 1 })}
      />

      <div class="row">
        <ListForm fieldName="steps" fieldVal1="stepNum" fieldVal2="stepDesc" />

        <ListForm fieldName="ingredients" fieldVal1="qty" fieldVal2="name" />
        {/* {stepIndexes.map((index) => {
          const fieldName = `steps[${index}]`;
          return (
            <fieldset name={fieldName} key={fieldName}>
              <label>
                Step Description:
                <input
                  type="number"
                  name={`${fieldName}.stepNum`}
                  ref={register}
                  style={{ display: "none" }}
                  value={index + 1}
                  readOnly
                />
                <input
                  type="text"
                  name={`${fieldName}.stepDesc`}
                  ref={register}
                />
              </label>
              <button type="button" onClick={removeStep(index)}>
                Remove
              </button>
            </fieldset>
          );
        })} */}
        {/* <button type="button" onClick={addStep}>
          Add Friend
        </button>
        <button type="button" onClick={clearSteps}>
          Clear Friends
        </button> */}
      </div>

      {/* <div class="row">
        <h1>Add ingredients</h1>
        {ingredientIndexes.map((index) => {
          const fieldName = `ingredients[${index}]`;
          return (
            <fieldset name={fieldName} key={fieldName}>
              <label>
                Ingredient Name:
                <input type="text" name={`${fieldName}.name`} ref={register} />
                <input type="text" name={`${fieldName}.qty`} ref={register} />
              </label>
              <button type="button" onClick={removeIngredient(index)}>
                Remove
              </button>
            </fieldset>
          );
        })}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
        <button type="button" onClick={clearIngredient}>
          Clear Ingredient List
        </button>
      </div>
      <input type="submit" /> */}
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
