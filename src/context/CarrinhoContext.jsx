/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { supabase } from "../../Supabase";

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);
  const [Produtos, setProdutos] = useState([]);
  const [propaganda, setPropaganda] = useState([]);

  const [carrinhoActive, setCarrinhoActive] = useState(false);

  useEffect(() => {
    async function fetchPropagandas() {
      const { data, error } = await supabase.from("imagem_prop").select("*");
      if (error) {
        console.error("Erro ao carregar itens para o carrinho:", error);
      } else {
        setPropaganda(data || []);
      }
    }
    fetchPropagandas();
  }, []);

  useEffect(() => {
    async function fetchCarrinho() {
      const { data, error } = await supabase
        .from("carrinho")
        .select("*")
        .eq("produto_id", 1);
      //.eq("produto_id", (data.produto_id = 1));
      if (error) {
        console.error("Erro ao carregar itens para o carrinho:", error);
      } else {
        setCarrinho(data || []);
      }
    }
    fetchCarrinho();
  }, []);

  useEffect(() => {
    async function fetchProdutos() {
      const { data, error } = await supabase.from("produtos").select("*");
      if (error) {
        console.error("Erro ao carregar itens para o carrinho:", error);
      } else {
        setProdutos(data || []);
      }
    }
    fetchProdutos();
  }, []);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        Produtos,
        setProdutos,
        carrinhoActive,
        setCarrinhoActive,
        propaganda,
        setPropaganda,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
