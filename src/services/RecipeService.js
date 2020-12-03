export async function getAllRecipes() {
  const response = await fetch(`/api/recipes/`);
  return await response.json();
}

export async function getRecipeById(id) {
  const response = await fetch(`/api/recipes/` + id);
  return await response.json();
}

export async function getRecipesSteps(name) {
  const response = await fetch(`/api/recipes?name=` + name);

  var responseParsed = await response.json();

  var recipeSteps = responseParsed.recipes[0].steps;

  return await recipeSteps;
}

export async function createRecipe(data) {
  const response = await fetch(`/api/recipes/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getRecipeByName(name) {
  const response = await fetch(`/api/recipes?name=` + name);
  return await response.json();
}

export async function deleteRecipeByName(name) {
  const response = await fetch(`/api/recipes/delete?name=` + name);
  return await response.json();
}

export async function importRecipe(url) {
  // const jsonld = require("jsonld");
  const cheerio = require("cheerio");
  

  const response = await fetch(
    `https://thingproxy.freeboard.io/fetch/` + url
  ).then((x) => x.text());

  // /html/adeh / script[1];
  const $ = cheerio.load(response);

  let title = $("meta[property='og:title']").attr("content");
  console.log(title);

  let description = $("meta[name='description']").attr("content");
  console.log(description);

  let recipeImage = $("meta[property='og:image']").attr("content");
  console.log(recipeImage)

  var ingredientsre = /"recipeIngredient": \[([^\]]+)\]/; 
  var ingredients = response.match(ingredientsre);
  const test = ingredients[0].replace(/\s+/g, ' ');
  
  console.log(test)

  var instructionsre = /"recipeInstructions": \[([^\]]+)\]/; 
  var instructions = response.match(instructionsre);
  console.log(instructions[0])
  var recipes = { recipe_name: title, recipe_intro: description, ingredients: [ingredientsre] };





  // Build the array data to send to create recipe
  // recipes.recipe.push({ recipe_name: title });
  // recipes.recipe.push({ recipe_intro: description });
  // recipes.push({ingredients: ingredients[1]})
  // recipes.push({steps: instructions[1]})

  // var recipeJson = JSON.stringify(recipes)
  console.log(recipes);

}
