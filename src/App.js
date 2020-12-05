import Dashboard from "./components/Layout/Dashboard";
import Header from "./components/Layout/Header";
import styled, { ThemeProvider } from "styled-components";
import theme from "styled-theming";

const boxBackgroundColor = theme("mode", {
  light: "#fff",
  dark: "#000",
});

const Box = styled.div`
  background-color: ${boxBackgroundColor};
`;

function App() {
  return (
    <ThemeProvider theme={{ mode: "light" }}>
      <Box className="App">
        <header className="App-header">
          <Header theme={theme} />
        </header>
        <body>
          <Dashboard />
        </body>
      </Box>
    </ThemeProvider>
  );
}

export default App;
