import React, { Component } from "react";
import {
  getAllRecipes,
  deleteRecipeByName,
  getRecipeByName,
} from "../../services/RecipeService";
import { Card, Col, Row } from "antd";

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [], recipes_storage: [] };
  }

  componentDidMount() {
    getAllRecipes();
  }

  deleteRecipe(name) {
    deleteRecipeByName(name)
      .then(() => {})
      .catch((error) => {});
  }

  searchRecipes(name) {
    getRecipeByName(name).then((response) => {
      this.recipes = response;
    });
  }

  getSteps(recipe) {
    const allSteps = Object.keys(recipe.steps).map(function (key) {
      return recipe.steps[key];
    });
    this.recipe_steps = allSteps;
  }

  getRecipeDetails(recipe) {
    var recipeByName = {
      recipes: [],
    };
    recipeByName.recipes.push(recipe);
    this.recipes = recipeByName;
    this.getIngredients(recipe);
    this.getSteps(recipe);
    this.detail_view = true;
  }

  getIngredients(recipe) {
    const allIngredients = Object.keys(recipe.ingredients).map(function (key) {
      return recipe.ingredients[key];
    });
    this.recipe_ingredients = allIngredients;
  }

  backBtn() {
    this.recipes = this.recipes_storage;
    this.detail_view = false;
  }

  clearSearch() {
    if (this.search_name != "") {
      this.getAllRecipes();
      this.search_name = "";
    }
  }

  getAllRecipes() {
    getAllRecipes().then((response) => {
      this.data = response;
      console.log(this.data);
      this.setState({ recipes_storage: this.data });
      this.setState({ recipes: this.data });
      this.recipe_steps = "";
      this.detail_view = false;
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, {this.state.data}</h1>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={8}>
              {this.state.recipes.map((recipe) => (
                <Card
                  key="recipes.toString()"
                  title="Card title"
                  bordered={false}
                >
                  {console.log(this.state.recipes)}
                  {recipe.name}
                </Card>
              ))}
            </Col>
          </Row>
        </div>
        ,
      </div>
    );
  }
}
