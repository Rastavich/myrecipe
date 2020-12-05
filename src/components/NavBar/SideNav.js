import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Recipe from "../Recipe/Recipes";
import CreateRecipe from "../Recipe/CreateRecipe/CreateRecipe";
import { Wrapper, Layout, Ul, FlexGrid, Li } from "./SideNav.elements";
import ImportRecipe from "../Recipe/RecipeImport/ImportRecipe";

const SideNav = () => {
  return (
    <Router>
      <Wrapper>
        <Layout>
          <Ul>
            <Li>
              <Link to="/">Home</Link>
            </Li>
            <Li>
              <Link to="/CreateRecipe">Create Recipe</Link>
            </Li>
            <Li>
              <Link to="/import">Import Recipe</Link>
            </Li>
          </Ul>
        </Layout>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/createRecipe">
            <FlexGrid>
              <Create />
            </FlexGrid>
          </Route>
          <Route path="/import">
            <FlexGrid>
              <Import />
            </FlexGrid>
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

function Import() {
  return <ImportRecipe />;
}

export default SideNav;
