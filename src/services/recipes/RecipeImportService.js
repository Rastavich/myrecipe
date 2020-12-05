import { createRecipe } from "./RecipeService";
const cheerio = require("cheerio");

// TODO: refactor all of this, add error handling
export async function importRecipe(url) {
  var importUrl = url;

  // Use CORS blocker when running fetch in development
  if (process.env.NODE_ENV === "development") {
    importUrl = `https://thingproxy.freeboard.io/fetch/` + url;
  }

  const response = await fetch(importUrl).then((x) => x.text());

  const $ = cheerio.load(response);

  let title = $("meta[property='og:title']").attr("content");
  let description = $("meta[name='description']").attr("content");
  let recipeImage = $("meta[property='og:image']").attr("content");

  var prepResponse = response.match(/(?<="prepTime": )[^,]+"/);
  const parsedPrepResponse = prepResponse[0].replace(/"/g, "");
  var prepTimeUnformatted = parsedPrepResponse;
  let prepTime = convertTimeFormat(prepTimeUnformatted);

  var cookResponse = response.match(/(?<="cookTime": )[^,]+"/);
  const parsedCookResponse = cookResponse[0].replace(/"/g, "");
  var cookTimeUnformatted = parsedCookResponse;
  var cookTime = convertTimeFormat(cookTimeUnformatted);

  var totalResponse = response.match(/(?<="totalTime": )[^,]+"/);
  const parsedTotalResponse = totalResponse[0].replace(/"/g, "");
  var totalTimeUnformatted = parsedTotalResponse;
  var totalTime = convertTimeFormat(totalTimeUnformatted);

  var recipeYieldResponse = response.match(/(?<="recipeYield": )[^,]+"/);
  const yieldResponse = recipeYieldResponse[0].replace(/"/gm, "");
  var recipeYield = yieldResponse;

  let recipeCategoryResponse = response.match(
    /(?<="recipeCategory": \[)[^\]]+"/
  );
  let categoryResponse = recipeCategoryResponse[0].replace(/"/gm, "");
  let recipeCategoryRegex = removeWhitespace(categoryResponse);
  var recipeCategory = recipeCategoryRegex.split(",");

  var nutritionValues = response.match(/(?<="NutritionInformation",\n)[^}]+/);
  const nutritionParsed = nutritionValues[0].replace(/\s+/g, " ");
  const parsedNutritionValues = nutritionParsed.replace(/"/gm, "");
  var nutrition = parsedNutritionValues.split(",");

  // Parsing the recipe ingredients from html
  var ingredientsMatch = response.match(/(?<="recipeIngredient": \[)[^\]]+"/);
  const ingredientsParse = ingredientsMatch[0].replace(/\s+/g, " ");
  const parsedIngredientsRegex = ingredientsParse.replace(/"/gm, "");
  var recipeIngredients = parsedIngredientsRegex.split(",");

  // Parsing the recipe steps from html
  let stepsMatch = response.match(/(?<="recipeInstructions": \[)[^\]]+"/);
  let stepsParse = stepsMatch[0].replace(/\s+/g, " ");
  let stepsParseSecond = stepsParse.replace(
    / { "@type": "HowToStep", "text":/g,
    ""
  );
  let stepsParseRegex = stepsParseSecond.replace(/"/gm, "");
  let recipeSteps = stepsParseRegex.split('",');

  console.log(recipeSteps);

  // Build the recipe data
  var recipes = {
    recipe_name: title,
    recipe_intro: description,
    ingredients: recipeIngredients,
    steps: recipeSteps,
    recipe_image: recipeImage,
    prep_time: prepTime,
    cook_time: cookTime,
    total_time: totalTime,
    yield: recipeYield,
    category: recipeCategory,
    nutrition: nutrition,
    recipe_url: url,
    difficulty: null,
  };

  createRecipe(recipes);

  console.log(recipes);
}

const convertTimeFormat = (time) => {
  let formatMinute = time.match(/(?<=T)[^H]/g);
  let formatHour = time.match(/(?<=H)[^H]./g);

  return [formatMinute[0], formatHour[0]];
};

const removeWhitespace = (data) => {
  return data.replace(/\s\n/);
};
