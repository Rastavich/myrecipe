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

  // console.log("hey");
  // Use CORS blocker when running fetch in development
  importUrl = `https://cors-anywhere.herokuapp.com/` + url;

  const response = await fetch(importUrl, {
    headers: {
      method: "GET",
    },
  }).then((x) => x.text());

  const $ = cheerio.load(response);

  var formatedHtml = response;
  // console.log(response);

  title = $("meta[property='og:title']").attr("content");
  description = $("meta[name='description']").attr("content");
  recipeImage = $("meta[property='og:image']").attr("content");

  var prepResponse = formatedHtml.match(/(?<="prepTime":)[^,]+"/);
  if (prepResponse) {
    const parsedPrepResponse = prepResponse[0].replace(/"/g, "");
    var prepTimeUnformatted = parsedPrepResponse;
    prepTime = convertTimeFormat(prepTimeUnformatted);
  }

  var cookResponse = formatedHtml.match(/(?<="cookTime":)[^,]+"/);
  if (cookResponse) {
    const parsedCookResponse = cookResponse[0].replace(/"/g, "");
    var cookTimeUnformatted = parsedCookResponse;
    cookTime = convertTimeFormat(cookTimeUnformatted);
  }

  var totalResponse = formatedHtml.match(/(?<="totalTime":)[^,]+"/);
  if (totalResponse) {
    const parsedTotalResponse = totalResponse[0].replace(/"/g, "");
    var totalTimeUnformatted = parsedTotalResponse;
    totalTime = convertTimeFormat(totalTimeUnformatted);
  }

  var recipeYieldResponse = formatedHtml.match(/(?<="recipeYield":)[^,]+"/);
  if (recipeYieldResponse) {
    const yieldResponse = recipeYieldResponse[0].replace(/"/gm, "");
    recipeYield = yieldResponse;
  }

  var recipeCategoryResponse = formatedHtml.match(/(?<=recipeCategory)[^\]]+"/);
  if (recipeCategoryResponse) {
    let categoryResponse = recipeCategoryResponse[0].replace(/"/gm, "");
    let recipeCategoryRegex = removeWhitespace(categoryResponse);
    recipeCategory = recipeCategoryRegex.split(",");
  }

  var nutritionValues = formatedHtml.match(
    /(?<="NutritionInformation",\n)[^}]+/
  );
  if (nutritionValues) {
    const nutritionParsed = nutritionValues[0].replace(/\s+/g, " ");
    const parsedNutritionValues = nutritionParsed.replace(/"/gm, "");
    nutrition = parsedNutritionValues.split(",");
  }
  // Parsing the recipe ingredients from html
  var ingredientsMatch = response.match(/(?<="recipeIngredient": \[)[^\]]+"/);
  if (!ingredientsMatch) {
    ingredientsMatch = response.match(/(?<="recipeIngredient":\[)[^\]]+"/);
  }
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
  var stepsMatch = response.match(/(?<="recipeInstructions": \[)[^\]]+"/);
  if (!stepsMatch) {
    stepsMatch = response.match(/(?<="recipeInstructions":\[)[^\]]+"/);
    var stepsParse = stepsMatch[0].replace(/\s+/g, " ");

    var stepsParseSecond = stepsParse.match(
      /(?<={"@type":"HowToStep","text":)[^:]*/gm
    );
    recipeSteps = stepsParseSecond;
  } else {
    let stepsParse = stepsMatch[0].replace(/\s+/g, " ");
    let stepsParseSecond = stepsParse.replace(
      /{"@type":"HowToStep","text":/g,
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

  try {
    // createRecipe(recipes);
    return recipes;

    // console.log(recipes);
  } catch (e) {
    console.log("Error");
  }
}

const convertTimeFormat = (time) => {
  let formatMinute = time.match(/(?<=T)[^H]/g);
  let formatHour = time.match(/(?<=H)[^H]./g);

  if (formatMinute && formatHour) {
    return [formatMinute, formatHour];
  } else if (!formatMinute && formatHour) {
    return formatHour;
  } else if (formatMinute && !formatHour) {
    return formatMinute;
  }

  return null;
};

const removeWhitespace = (data) => {
  if (data) {
    return data.replace(/\s/gm, "");
  }
};
