import { useContext } from "react";
import { CarrinhoContext } from "../context/CarrinhoContext";

export function useCarrinhoContext() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error(
      "useCarrinhoContext deve ser usado dentro de um CarrinhoProvider"
    );
  }
  return context;
}
