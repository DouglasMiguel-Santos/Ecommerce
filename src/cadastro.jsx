// import { createRoot } from "react-dom/client";

import Produtos from "../pages/produtos.jsx";
import Footer from "../pages/footer";
import Header from "../pages/header";
import { CarrinhoProvider } from "./context/CarrinhoContext";

// createRoot(document.getElementById("root")).render
function Cadastro() {
  return (
    <CarrinhoProvider>
      <Header />
      <Produtos />
      <Footer />
    </CarrinhoProvider>
  );
}
export default Cadastro;
