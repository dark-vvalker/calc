import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// const domContainer = document.querySelector("#root");
// const root = ReactDOM.createRoot(domContainer);
// root.render(e(LikeButton));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
