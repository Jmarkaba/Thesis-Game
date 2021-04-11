import "./App.css";
import Header from "./Header";
import Model1 from "./Models/Model1";
function App() {
  return (
    <div id="main">
      <div id="header">
        <Header></Header>
      </div>
      <div id="model" className="App-header">
        <Model1></Model1>
      </div>
    </div>
  );
}

export default App;
