import "./App.css";
import React from "react";

// Definição correta do reducer
const countReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state + 1; // Retorna um novo estado
    case "delete":
      return state - 1; // Retorna um novo estado
    case "zerar":
      return 0; // Reseta para zero
    default:
      return state; // Retorna o estado atual se a ação não for reconhecida
  }
};

// Componente principal
export default function App() {
  const useReducer = React.useReducer;
  const [count, dispatch] = useReducer(countReducer, 0);

  return (
    <div className="container">
      <h2>Counter App</h2>
      <p className="counter">{count}</p>
      {/* Não remova as classes dos botões */}
      <div className="buttons">
        <button onClick={() => dispatch({ type: "add" })} className="increment">
          Aumentar
        </button>
        <button
          onClick={() => dispatch({ type: "delete" })}
          className="decrement"
        >
          Diminuir
        </button>
        <button onClick={() => dispatch({ type: "zerar" })} className="reset">
          Zerar
        </button>
      </div>
    </div>
  );
}
