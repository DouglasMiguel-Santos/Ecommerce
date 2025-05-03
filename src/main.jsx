import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import Login from "./Login.jsx";
import Cadastro from "./cadastro.jsx";
import Pagamento from "./Pagamento.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="App" element={<App />} />
        <Route path="Cadastro" element={<Cadastro />} />
        <Route path="Pagamento" element={<Pagamento />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
