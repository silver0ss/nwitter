import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { firebaseApp } from "./firebase";
console.log(firebaseApp);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
