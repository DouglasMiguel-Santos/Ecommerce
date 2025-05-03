// App.jsx
import React from "react";

import PageLogin from "../pages/PageLogin";
import { CarrinhoProvider } from "./context/CarrinhoContext";

function Login() {
  return (
    <React.StrictMode>
      <CarrinhoProvider>
        <PageLogin />
      </CarrinhoProvider>
    </React.StrictMode>
  );
}

export default Login;
