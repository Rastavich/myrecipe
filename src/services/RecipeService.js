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

  const recipes = [];

  // const doc = {
  //   "http://schema.org/url": { "@id": "http://manu.sporny.org/" },
  //   "http://schema.org/image": {
  //     "@id": "http://manu.sporny.org/images/manu.png",
  //   },
  // };
  // const context = {
  //   name: "http://schema.org/name",
  //   homepage: { "@id": "http://schema.org/url", "@type": "@id" },
  //   image: { "@id": "http://schema.org/image", "@type": "@id" },
  // };

  const response = await fetch(
    `https://thingproxy.freeboard.io/fetch/https://www.allrecipes.com/recipe/275397/penang-pork-satay/`
  ).then((x) => x.text());

  // /html/adeh / script[1];
  console.log(response);
  const $ = cheerio.load(response);

  let title = $("meta[property='og:title']").attr("content");
  console.log(title);

  let q = $("script[type='application/ld+json']");
  console.log(q[0]);

  $("html > head > script").each((_idx, el) => {
    const recipe = $(el).text();
    recipes.push(recipe);
  });
}
// export async function updateRecipeByName(name) {
//     const response = await fetch(`/api/recipes/update?name=` + name);
//     return await response.json();
// }
