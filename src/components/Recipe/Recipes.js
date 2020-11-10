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

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRecipes = () => {
    getAllRecipes().then((response) => {
      const data = response;
      const recipe = data;
      setData(recipe);
      setLoading(false);
    });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return { data, loading };
};

const Recipe = () => {
  const { data, loading } = useFetch();
  // const [recipeDisplay, setRecipeDisplay] = useState({ data });

  const deleteRecipe = (name) => {
    deleteRecipeByName(name)
      .then(() => {
        // return response;
        console.log(data);
        // console.log(recipeDisplay);
        data.filter(data.recipes.recipe_name !== name);
        console.log(data);
      })
      .catch((error) => {
        return error;
      });
  };

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
              <Column>
                <CardWrapper>
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
                    <Button data={recipe} name="View"></Button>
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
        </>
      )}
    </div>
  );
};

export default Recipe;
