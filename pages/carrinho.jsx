// pages/carrinho.jsx
import "../src/css/carrinho.css";
import { BsBagPlus, BsBagDash, BsCartX } from "react-icons/bs";
import { supabase } from "../Supabase";
import { useEffect, useRef } from "react";
import { TbXboxX } from "react-icons/tb";
import { useState } from "react";
import { useCarrinhoContext } from "../src/hook/useCarrinhoContext";
import { Link } from "react-router-dom";

export default function Carrinho() {
  const { carrinho, setCarrinho, carrinhoActive, setCarrinhoActive } =
    useCarrinhoContext();
  // const [visivel, setVisivel] = useState(true); // Controla se o modal está aberto
  const CarrinhoModal = useRef(null);
  const [TotalCarrinho, setTotalCarrinho] = useState(0);

  // Busca produtos no carrinho
  useEffect(() => {
    fetchCarrinho();
  }, []);

  const fetchCarrinho = async () => {
    const { data, error } = await supabase
      .from("carrinho")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      console.error("Erro ao buscar carrinho:", error);
      return;
    }
    setCarrinho(data);
  };

  // SOMAR TODOS OS VALORES DOS PRODUTOS NO CARRINHO
  useEffect(() => {
    function SomaCarrinho() {
      if (carrinho.length === 0) {
        setTotalCarrinho(0);
      } else {
        const Soma = carrinho.reduce((acc, item) => acc + item.total, 0);
        console.log(Soma);
        setTotalCarrinho(Soma);
      }
    }
    SomaCarrinho();
  }, [carrinho]);

  // Deletar item do carrinho
  async function dashCarrinho(produto_id, quantidade) {
    try {
      if (quantidade === 1) {
        await supabase.from("carrinho").delete().eq("produto_id", produto_id);
        setCarrinho((prevCarrinho) =>
          prevCarrinho.filter((item) => item.produto_id !== produto_id)
        );
      } else {
        await supabase
          .from("carrinho")
          .update({ quantidade: quantidade - 1 })
          .eq("produto_id", produto_id);
      }
      fetchCarrinho();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  }

  async function DelCarrinho(produto_id) {
    await supabase.from("carrinho").delete().eq("produto_id", produto_id);
    setCarrinho((prevCarrinho) =>
      prevCarrinho.filter((item) => item.produto_id !== produto_id)
    );
  }

  // Adicionar item ao carrinho
  async function addCarrinho(produto_id, quantidade) {
    try {
      await supabase
        .from("carrinho")
        .update({ quantidade: quantidade + 1 })
        .eq("produto_id", produto_id);
      fetchCarrinho();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  }

  //---------------------------------------------------------------------------------
  return (
    <section
      className="Carrinho"
      ref={CarrinhoModal}
      style={{ display: carrinhoActive ? "flex" : "none" }}
    >
      <div
        className="btn-fecharCarrinho"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h2>Carrinho de compras</h2>
          <p style={{ color: "gray" }}>({carrinho.length}) Itens</p>
        </div>

        <button
          onClick={() => {
            setCarrinhoActive(false);
          }}
        >
          <TbXboxX />
        </button>
      </div>

      <div className="Div_Maior">
        {carrinho.length > 0 ? (
          carrinho.map((item, index) => (
            <div
              className="carrinhoCard"
              key={item.produto_id || `carrinho-${index}`}
            >
              <div className="imagem">
                <img src={item.imagem_url} alt={item.nome} />
              </div>

              <div className="carrinho-produto">
                <div className="descricao">
                  <h1>{item.nome.toUpperCase()}</h1>
                  <span>
                    <p>Cor: {item.cor}</p>
                    <h2>R$ {item.preco.toFixed(2).replace(".", ",")}</h2>
                  </span>

                  <p>Tamanho: {item.tamanho}</p>
                </div>

                <div className="botoes">
                  <button
                    onClick={() =>
                      dashCarrinho(item.produto_id, item.quantidade)
                    }
                  >
                    <BsBagDash />
                  </button>

                  <p> {item.quantidade}</p>
                  <div className="botoes2">
                    <button
                      onClick={() =>
                        addCarrinho(item.produto_id, item.quantidade)
                      }
                    >
                      <BsBagPlus />
                    </button>
                    <button
                      onClick={() =>
                        DelCarrinho(item.produto_id, item.quantidade)
                      }
                    >
                      <BsCartX />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Carrinho vazio</p>
        )}
      </div>

      {carrinho.length >= 0 && (
        <div className="informacoes-carrinho">
          <span>
            <h3>Subtotal</h3>
            <div className="subtotal">
              <p>R$ {TotalCarrinho.toFixed(2).replace(".", ",")}</p>
              <p style={{ color: "gray" }}>
                ou 10x R$ {(TotalCarrinho / 10).toFixed(2)}
              </p>
            </div>
          </span>
          <div className="traco"></div>
          <span>
            <h3>Descontos</h3>
            <p>R$ 0,00</p>
          </span>
          <div className="traco"></div>
          <span>
            <h3>Frete</h3> <p>Calculado na próxima etapa</p>
          </span>

          <Link to="/Pagamento">
            <button>
              Finalizar pedido
              <p>{TotalCarrinho.toFixed(2).replace(".", ",")}</p>
            </button>
          </Link>
          <a
            href="#"
            onClick={() => {
              setCarrinhoActive(false);
            }}
          >
            Continuar comprando
          </a>
        </div>
      )}
    </section>
  );
}
