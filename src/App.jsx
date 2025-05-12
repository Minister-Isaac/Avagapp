/* eslint-disable react/jsx-no-comment-textnodes */
import React from "react";

import { Toaster } from "react-hot-toast";
import Routes from "./routes/router";
// import "./App.css";

function App() {
  return (
    <div>
      <Toaster />
         <Routes/>
      </div>
  );
}

export default App;
