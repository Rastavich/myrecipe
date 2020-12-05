import { createRecipe } from "./RecipeService"

// TODO: refactor all of this, add error handling
export async function importRecipe(url) {

  var importUrl = url;

  // Use CORS blocker when running fetch in development
  if (process.env.NODE_ENV == "development") {
    importUrl = `https://thingproxy.freeboard.io/fetch/` + url;
  }
    
    const cheerio = require("cheerio");
    
    const response = await fetch(
      importUrl
    ).then((x) => x.text());
  
    // /html/adeh / script[1];
    const $ = cheerio.load(response);
  
    let title = $("meta[property='og:title']").attr("content");
    // console.log(title);
  
    let description = $("meta[name='description']").attr("content");
    // console.log(description);
  
    let recipeImage = $("meta[property='og:image']").attr("content");
    // console.log(recipeImage)

    var prepTimeRegex = /(?<="prepTime": )[^\,]+"/;
    var prepTime = response.match(prepTimeRegex);

    var cookTimeRegex = /(?<="cookTime": )[^\,]+"/;
    var cookTime = response.match(cookTimeRegex);

    var totalTimeRegex = /(?<="totalTime": )[^\,]+"/;
    var totalTime = response.match(totalTimeRegex);

    var recipeYieldRegex = /(?<="recipeYield": )[^\,]+"/;
    var recipeYield = response.match(recipeYieldRegex);

    var recipeCategoryRegex = /(?<="recipeCategory": \[)[^\]]+"/;
    var recipeCategory = response.match(recipeCategoryRegex);

    var nutritionValuesRegex = /(?<="NutritionInformation",\n)[^\]]+}/;
    var nutritionValues = response.match(nutritionValuesRegex);
  
    // Parsing the recipe ingredients from html 
    var ingredientsRegex = /(?<="recipeIngredient": \[)[^\]]+"/;
    var ingredientsMatch = response.match(ingredientsRegex);
    const ingredientsParse = ingredientsMatch[0].replace(/\s+/g, ' ');
    const parsedIngredientsRegex = ingredientsParse.replace(/"/gm, '');
    var recipeIngredients = new Array();
    recipeIngredients = parsedIngredientsRegex.split(','); 

    console.log(parsedIngredientsRegex)
  
    // Parsing the recipe steps from html
    var stepsRegex = /(?<="recipeInstructions": \[)[^\]]+"/;
    var stepsMatch = response.match(stepsRegex);
    const stepsParse = stepsMatch[0].replace(/\s+/g, ' ');
    const parsedStepsRegex = stepsParse.replace(/"/gm,'');
    const secondParse = parsedStepsRegex.replace(/{ @type: HowToStep, text:/gm, '')
    var recipeSteps = new Array();
    recipeSteps = secondParse.split(',');

    console.log(secondParse)

  
    // Build the recipe data 
    var recipes = { recipe_name: title, recipe_intro: description, ingredients: recipeIngredients, steps: recipeSteps, recipe_image: recipeImage, prep_time: prepTime, cook_time: cookTime, total_time: totalTime, yield: recipeYield, category: recipeCategory, nutrition: nutritionValues};
  
    // createRecipe(recipes);
    console.log(recipes);
  
  }