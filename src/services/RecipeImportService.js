
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
  
    var ingredientsre = /"recipeIngredient": \[([^\]]+)\]/; 
    var ingredients = response.match(ingredientsre);
    const test = ingredients[0].replace(/\s+/g, ' ');
    var temp = new Array();
    temp = test.split(',');
  
    
    
    console.log(temp)
  
    var instructionsre = /"recipeInstructions": \[([^\]]+)\]/; 
    var instructions = response.match(instructionsre);
    // console.log(instructions[0])
  
    // Build the recipe data 
    var recipes = { recipe_name: title, recipe_intro: description, ingredients: [test], recipe_image: recipeImage};
  
    console.log(recipes);
  
  }