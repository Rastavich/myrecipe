import { createRecipe } from "./RecipeService"

export async function importRecipe(url) {
    // const jsonld = require("jsonld");
    const cheerio = require("cheerio");
    
  
    const response = await fetch(
      `https://thingproxy.freeboard.io/fetch/` + url
    ).then((x) => x.text());
  
    // /html/adeh / script[1];
    const $ = cheerio.load(response);
  
    let title = $("meta[property='og:title']").attr("content");
    // console.log(title);
  
    let description = $("meta[name='description']").attr("content");
    // console.log(description);
  
    let recipeImage = $("meta[property='og:image']").attr("content");
    // console.log(recipeImage)
  
    var ingredientsre = /(?<="recipeIngredient": \[)[^\]]+\]/;
    var ingredients = response.match(ingredientsre);
    const test = ingredients[0].replace(/\s+/g, ' ');
    const test2 = test.replace(/"/, '');
    var temp = new Array();
    temp = test2.split(',');
  
    
    
    console.log(temp)
  
    var instructionsre = /(?<="recipeInstructions": \[)[^\]]+\]/;
    var instructions = response.match(instructionsre);
    const instre1 = instructions[0].replace(/\s+/g, ' ');
    const instre2 = instre1.replace(/"/,'');
    var temp2 = new Array();
    temp2 = instre2.split(',');

  
    // Build the recipe data  = intr
    var recipes = { recipe_name: title, recipe_intro: description, ingredients: temp, steps: temp2, recipe_image: recipeImage};
  
     createRecipe(recipes);
    console.log(recipes);
  
  }