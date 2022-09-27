import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// State
import ShowsState from "./contexts/shows/ShowsState";
import AlertsState from "./contexts/alerts/AlertsState";

ReactDOM.render(
  <ShowsState>
    <AlertsState>
      <App />
    </AlertsState>
  </ShowsState>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();