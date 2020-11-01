import "./App.css";
import { Button } from "antd";
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
        {/* <Button type="primary">Button</Button> */}
      </body>
    </div>
  );
}

export default App;
