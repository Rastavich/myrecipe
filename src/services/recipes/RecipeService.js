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

export async function updateRecipeByName(name) {
  const response = await fetch(`/api/recipes/update?name=` + name);
  return await response.json();
}
