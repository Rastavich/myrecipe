import "./App.css";

import Dashboard from "./components/Layout/Dashboard";
import Header from "./components/Layout/Header";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        <Dashboard />
      </body>
    </div>
  );
}

export default App;
