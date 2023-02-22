import Main from "./components/Main";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <div className="calc-header text-center mb-5">
        <h2 className="m-0 mb-3">Калькулятор on-line</h2>
        <p className="m-0">розрахунку вартості м'яких вікон / ПВХ штор</p>
      </div>
      <div className="calc-main mb-5">
        <div className="container">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
