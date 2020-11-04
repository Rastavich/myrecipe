import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Recipe from "../Recipe/Recipes";
import { Wrapper, Layout, Ul, FlexGrid } from "./SideNav.elements";

const SideNav = () => {
  return (
    <Router>
      <Wrapper>
        <Layout>
          <Ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/CreateRecipe">Create Recipe</Link>
            </li>
          </Ul>
        </Layout>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/createRecipe">
            <CreateRecipe />
          </Route>
          <Route path="/">
            <FlexGrid>
              <Recipes />
            </FlexGrid>
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
};

function Recipes() {
  return <Recipe />;
}

function CreateRecipe() {
  return <h2>Create Recipe</h2>;
}

export default SideNav;
