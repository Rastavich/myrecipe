import { useState, useEffect } from "react";
import {
  getAllRecipes,
  deleteRecipeByName,
} from "../../services/RecipeService";
import { ClapSpinner } from "react-spinners-kit";
import {
  Column,
  CardWrapper,
  Row,
  CardImage,
  CardTitle,
  CardDescription,
  CardContent,
} from "./Recipes.elements";
import Button from "../Generics/Button";
import { HiOutlineHashtag } from "react-icons/hi";
import { Btn } from "../Generics/Button.elements";
import RecipeDetails from "./RecipeDetails/RecipeDetails";

const Recipe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchRecipes = () => {
    getAllRecipes()
      .then((response) => {
        const data = response;
        const recipe = data;
        setData(recipe);
        setLoading(false);
      })
      .catch((error) => {
        setData(null);
        setLoading(false);
        return error;
      });
  };

  function viewRecipe(recipe) {
    // setShowDetails(!showDetails);
    console.log(recipe);
    setShowDetails(true);
    setRecipeDetails(recipe);
    return recipeDetails;
  }

  const deleteRecipe = (name) => {
    deleteRecipeByName(name)
      .then(() => {
        setData({
          recipes: data.recipes.filter((item) => item.recipe_name !== name),
        });
      })
      .catch((error) => {
        return error;
      });
  };

  useEffect(() => {
    let isMounted = false;

    if (!isMounted) {
      fetchRecipes();
    }

    return () => {
      isMounted = true;
    };
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Column>
          <ClapSpinner size={30} color="#686769" />
        </Column>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {data.recipes.map((recipe) => (
              <Column key={recipe.recipe_name}>
                <CardWrapper key={recipe.recipe_name}>
                  <CardImage
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                  <CardContent>
                    <CardTitle inline="inline-flex">
                      {recipe.recipe_name}
                    </CardTitle>
                    <CardDescription inline="">
                      <HiOutlineHashtag />
                      {recipe.category_name}
                    </CardDescription>
                    <CardDescription>
                      Prep time: {recipe.prep_time}
                    </CardDescription>

                    <Btn
                      onClick={() => {
                        viewRecipe(recipe);
                      }}
                    >
                      {/* viewRecipe(recipe.recipe_name)} */}
                      View
                    </Btn>
                    <Btn
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this item?"
                          )
                        )
                          deleteRecipe(recipe.recipe_name);
                      }}
                    >
                      Delete
                    </Btn>
                  </CardContent>
                </CardWrapper>
              </Column>
            ))}
          </Row>
          {showDetails && <RecipeDetails recipe={recipeDetails} />}
        </>
      )}
    </div>
  );
};

export default Recipe;
