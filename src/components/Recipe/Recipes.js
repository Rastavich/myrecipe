import React, { useState, useEffect } from "react";
import { getAllRecipes } from "../../services/RecipeService";
import { Row, Col } from "antd";
import styled from "styled-components";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

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

  console.log(data);
  // const { recipe_name } = data.recipes;

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Wrapper>
            <Row gutter={[16, 16]}>
              {data.recipes.map((recipe) => (
                <Col span={6}>
                  <Card
                    style={{ width: 260 }}
                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                  >
                    <Meta
                      title={recipe.recipe_name}
                      description={recipe.recipe_intro}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </Wrapper>
        </>
      )}
    </div>
  );
};

const Wrapper = styled.section`
  margin: 0 auto;
  width: 100em;
`;

export default Recipe;
