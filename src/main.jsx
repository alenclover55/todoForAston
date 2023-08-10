import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { ThemeContext, themes } from "./context/ThemeContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeContext.Provider value={themes}>
      <App />
    </ThemeContext.Provider>
  </BrowserRouter>
);
