import PagePagamento from "../pages/PagePagamento";
import Footer from "../pages/footer";
import Header from "../pages/header";
import { CarrinhoProvider } from "./context/CarrinhoContext";

// createRoot(document.getElementById("root")).render
function Pagamento() {
  return (
    <CarrinhoProvider>
      <Header />
      <PagePagamento />
      <Footer />
    </CarrinhoProvider>
  );
}
export default Pagamento;
