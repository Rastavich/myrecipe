import React, { useState, useEffect } from "react";
import { getAllRecipes } from "../../services/RecipeService";
import styled from "styled-components";
import { Spin } from "antd";

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

  return (
    <div className="App">
      {loading ? (
        <div>
          <Spin />
        </div>
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
                  <CardTitle>{recipe.recipe_name}</CardTitle>
                  <CardDescription>{recipe.recipe_intro}</CardDescription>
                </CardWrapper>
              </Column>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

const CardWrapper = styled.div`
  width: 270px;
  flex-direction: row;
  border: 1px;
  border-color: black;
  border-style: solid;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 200px;
  }
`;

const CardTitle = styled.h1``;

const CardDescription = styled.p``;

const Column = styled.div`
  display: inline-flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  width: fit-content;
  padding: 2px;
`;

const CardImage = styled.img`
  max-width: -webkit-fill-available;
`;

const Row = styled.div``;

export default Recipe;
