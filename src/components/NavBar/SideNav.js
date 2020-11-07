import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Recipe from "../Recipe/Recipes";
import CreateRecipe from "../Recipe/CreateRecipe";
import { Wrapper, Layout, Ul, FlexGrid, MenuItem } from "./SideNav.elements";

const SideNav = () => {
  return (
    <Router>
      <Wrapper>
        <Layout>
          <Ul>
            <li>
              <Link to="/">
                <MenuItem>Home</MenuItem>
              </Link>
            </li>
            <li>
              <Link to="/CreateRecipe">
                <MenuItem>Create Recipe</MenuItem>
              </Link>
            </li>
          </Ul>
        </Layout>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/createRecipe">
            <Create />
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

function Create() {
  return <CreateRecipe />;
}

export default SideNav;
