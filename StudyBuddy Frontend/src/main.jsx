import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import "./i18n";
import { BrowserRouter as Router } from "react-router-dom";
import TopNav from "./Components/TopNav.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <TopNav />
      <App />
    </Router>
  </React.StrictMode>
);
