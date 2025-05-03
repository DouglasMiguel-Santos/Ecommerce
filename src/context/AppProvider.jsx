// import { useState, useEffect } from "react";
// import { CarrinhoContext } from "./CarrinhoContext";
// import { supabase } from "../../Supabase";

// export default function AppProvider({ children }) {
//   const [carrinho, setCarrinho] = useState([]);
//   const [Produtos, setProdutos] = useState([]);
//   //--------------------------------------------------------
//   const [carrinhoActive, setCarrinhoActive] = useState(false);

//   useEffect(() => {
//     async function fetchProdutos() {
//       const { data, error } = await supabase.from("produtos").select("*");
//       if (error) {
//         console.error("Erro ao carregar itens para o carrinho:", error);
//       } else {
//         setProdutos(data || []);
//       }
//     }

//     fetchProdutos(); // Chamando a função de fetch
//   }, []); // Array de dependências vazio para rodar apenas uma vez

//   //-------------------------------------------------------------------------------------------------

//   useEffect(() => {
//     async function fetchCarrinho() {
//       const { data, error } = await supabase.from("carrinho").select("*");
//       if (error) {
//         console.error("Erro ao carregar itens para o carrinho:", error);
//       } else {
//         setCarrinho(data || []);
//       }
//     }

//     fetchCarrinho(); // Chamando a função de fetch
//   }, []); // Array de dependências vazio para rodar apenas uma vez
//   //-----------------------------------------------------------------------------------------------

//   return (
//     <CarrinhoContext.Provider
//       value={{
//         carrinho,
//         setCarrinho,
//         Produtos,
//         setProdutos,
//         carrinhoActive,
//         setCarrinhoActive,
//       }}
//     >
//       {children}
//     </CarrinhoContext.Provider>
//   );
// }
