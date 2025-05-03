// App.jsx

import Footer from "../pages/footer";
import Header from "../pages/header";
import InicioPropagandas from "../pages/inicioPropagandas";
import "./css/App.css";
import { CarrinhoProvider } from "./context/CarrinhoContext";

import Carrinho from "../pages/carrinho";

function App() {
  return (
    <CarrinhoProvider>
      <Header />
      <InicioPropagandas />
      <Carrinho />
      <Footer />
    </CarrinhoProvider>
  );
}

export default App;
