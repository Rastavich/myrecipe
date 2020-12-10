import { createRecipe } from "./RecipeService";
const cheerio = require("cheerio");

// TODO: refactor all of this, add error handling
export async function importRecipe(url) {
  var importUrl = url;
  var title = null;
  var description = null;
  var recipeIngredients = null;
  var recipeSteps = null;
  var recipeImage = null;
  var prepTime = null;
  var cookTime = null;
  var totalTime = null;
  var recipeYield = null;
  var recipeCategory = null;
  var nutrition = null;

  // Use CORS blocker when running fetch in development
  importUrl = `https://cors-anywhere.herokuapp.com/` + url;

  const response = await fetch(importUrl, {
    headers: {
      method: "GET",
    },
  }).then((x) => x.text());

  const $ = cheerio.load(response);

  title = $("meta[property='og:title']").attr("content");
  description = $("meta[name='description']").attr("content");
  recipeImage = $("meta[property='og:image']").attr("content");

  var prepResponse = response.match(/(?<="prepTime": )[^,]+"/);
  if (prepResponse) {
    const parsedPrepResponse = prepResponse[0].replace(/"/g, "");
    var prepTimeUnformatted = parsedPrepResponse;
    prepTime = convertTimeFormat(prepTimeUnformatted);
  }

  var cookResponse = response.match(/(?<="cookTime": )[^,]+"/);
  if (cookResponse) {
    const parsedCookResponse = cookResponse[0].replace(/"/g, "");
    var cookTimeUnformatted = parsedCookResponse;
    cookTime = convertTimeFormat(cookTimeUnformatted);
  }

  var totalResponse = response.match(/(?<="totalTime": )[^,]+"/);
  if (totalResponse) {
    const parsedTotalResponse = totalResponse[0].replace(/"/g, "");
    var totalTimeUnformatted = parsedTotalResponse;
    totalTime = convertTimeFormat(totalTimeUnformatted);
  }

  var recipeYieldResponse = response.match(/(?<="recipeYield": )[^,]+"/);
  if (recipeYieldResponse) {
    const yieldResponse = recipeYieldResponse[0].replace(/"/gm, "");
    recipeYield = yieldResponse;
  }

  let recipeCategoryResponse = response.match(
    /(?<="recipeCategory": \[)[^\]]+"/
  );
  if (recipeCategoryResponse) {
    let categoryResponse = recipeCategoryResponse[0].replace(/"/gm, "");
    let recipeCategoryRegex = removeWhitespace(categoryResponse);
    recipeCategory = recipeCategoryRegex.split(",");
  }

  var nutritionValues = response.match(/(?<="NutritionInformation",\n)[^}]+/);
  if (nutritionValues) {
    const nutritionParsed = nutritionValues[0].replace(/\s+/g, " ");
    const parsedNutritionValues = nutritionParsed.replace(/"/gm, "");
    nutrition = parsedNutritionValues.split(",");
  }
  // Parsing the recipe ingredients from html
  var ingredientsMatch = response.match(/(?<="recipeIngredient": \[)[^\]]+"/);
  if (ingredientsMatch) {
    const ingredientsParse = ingredientsMatch[0].replace(/\s+/g, " ");
    const removeErrandCommas = ingredientsParse.replace(
      /(?=, [a-zA-Z])./gm,
      ""
    );
    const parsedIngredientsRegex = removeErrandCommas.replace(/"/gm, "");
    recipeIngredients = parsedIngredientsRegex.split(",");
  }

  // Parsing the recipe steps from html
  let stepsMatch = response.match(/(?<="recipeInstructions": \[)[^\]]+"/);
  if (stepsMatch) {
    let stepsParse = stepsMatch[0].replace(/\s+/g, " ");
    let stepsParseSecond = stepsParse.replace(
      / { "@type": "HowToStep", "text":/g,
      ""
    );
    let stepsParseThird = stepsParseSecond.replace(/(?=\\)[^/,]*/gm, "");
    recipeSteps = stepsParseThird.split(', "');
  }

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

  // createRecipe(recipes);
  return recipes;
}

const convertTimeFormat = (time) => {
  let formatMinute = time.match(/(?<=T)[^H]/g);
  let formatHour = time.match(/(?<=H)[^H]./g);

  return [formatMinute[0], formatHour[0]];
};

const removeWhitespace = (data) => {
  return data.replace(/\s\n/);
};
