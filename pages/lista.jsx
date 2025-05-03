import { useState, useReducer } from "react";
const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.text }];
    case "remove":
      return state.filter((task) => task.id !== action.id);
    case "reset":
      return [];
  }
}

export function Lista() {
  const [input, setInput] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);

  function addTask() {
    dispatch({ type: "add", text: input });

    setInput("");
  }

  return (
    <div>
      <h1>Tarefas</h1>
      <br />
      <br />
      <button onClick={() => dispatch({ type: "reset" })}>resetar</button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTask}> adicionar tarefa</button>
      <hr />
      <br />
      <ul>
        {state.map((task) => (
          <li key={task.id}>
            <span>
              {task.text} -{" "}
              <button onClick={() => dispatch({ type: "remove", id: task.id })}>
                remover
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
