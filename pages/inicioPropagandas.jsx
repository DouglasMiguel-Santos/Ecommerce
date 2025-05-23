import { useEffect, useState } from "react";
import "../src/css/propaganda.css";

import { supabase } from "../Supabase";
import { useCarrinhoContext } from "../src/hook/useCarrinhoContext";
// import { BiFontSize } from "react-icons/bi";

function InicioPropagandas() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [Categoria, setCategoria] = useState("");
  const [ProdDet, setProdDet] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("TODOS");

  const {
    carrinho,
    setCarrinho,
    Produtos,
    setProdutos,
    propaganda,
    setPropaganda,
  } = useCarrinhoContext();

  //-------------------------------------------------------------------------------------------------------
  //ADD OS PRODUTOS DO CARRINHO A VARIAVEL CARRINHO

  useEffect(() => {
    fetchCarrinho();
  }, []);

  const fetchCarrinho = async () => {
    const { data } = await supabase.from("carrinho").select("*");

    setCarrinho(data);
    console.log("carrinho:", data);

    return carrinho;
  };

  useEffect(() => {
    fetchPropaganda();
  }, []);

  const fetchPropaganda = async () => {
    const { data } = await supabase.from("imagem_prop").select("*");

    setPropaganda(data || []);
    console.log("propaganda:", data);

    return propaganda;
  };

  //-------------------------------------------------------------------------------------------------------
  //salva na variavel Produtos os produtos do banco de dados
  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    const { data } = await supabase.from("produtos").select("*");

    setProdutos(data);
    console.log("Produtos:", Produtos);
    return Produtos;
  };

  //-------------------------------------------------------------------------------------------------------
  //FUNCAO PARA ADD UM ITEM AO BANCO CARRINHO
  async function AddCarrinho(id) {
    const produtoNoCarrinho = carrinho.find((item) => item.produto_id === id);
    const { data } = await supabase.from("produtos").select("*").eq("id", id);
    const response = data;

    if (!produtoNoCarrinho) {
      // Se o produto ainda não está no carrinho, insere um novo item
      const { error } = await supabase.from("carrinho").insert([
        {
          produto_id: id,
          quantidade: 1,
          preco: response[0].preco,
          nome: response[0].nome,
          cor: response[0].cor,
          tamanho: response[0].tamanho,
          imagem_url: response[0].imagem_url,
        },
      ]);

      if (error) {
        console.error("Erro ao adicionar produto:", error);
        return;
      }
    } else if (produtoNoCarrinho) {
      // Se o produto já está no carrinho, atualiza a quantidade
      const { error } = await supabase
        .from("carrinho")
        .update({ quantidade: produtoNoCarrinho.quantidade + 1 })
        .eq("produto_id", id);

      if (error) {
        console.error("Erro ao atualizar quantidade:", error);
        return;
      }
      console.log(Produtos);
    }

    await fetchCarrinho();
  }

  async function detalhesProduto(id) {
    const { data } = await supabase.from("produtos").select("*").eq("id", id);
    console.log(ProdDet);
    setProdDet(data);
  }

  async function SelecionaCategoria(categoria) {
    if (categoria != "TODOS") {
      const { data } = await supabase
        .from("produtos")
        .select("*")
        .eq("categoria", categoria);
      setProdutos(data);
      setCategoriaSelecionada(categoria);
    } else if (categoria === "TODOS") {
      const { data } = await supabase.from("produtos").select("*");
      setProdutos(data);
      setCategoriaSelecionada(categoria);
    } else {
      alert("Não ha produtos com essa categoria");
    }
  }
  //-------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % propaganda.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [propaganda.length]);

  //-------------------------------------------------------------------------------------------------------

  return (
    <>
      <section className="propagandas">
        <div
          className="carousel"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
            display: "flex",
          }}
        >
          {propaganda.map((propagandas) => (
            <div className="propaganda" key={propagandas.id}>
              <img
                src={propagandas.image}
                alt={propagandas.id}
                onError={(e) => {
                  e.target.onerror = null; // Evita loop infinito se a imagem alternativa também não carregar
                  if (propagandas.image === null) {
                    e.target.src = "../img/propaganda1.jpg";
                  }
                }}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="section-categorias">
        <div className="text-prod">
          <h1>CATEGORIAS</h1>
        </div>
        <div className="categorias">
          <button
            type="button"
            className={categoriaSelecionada === "TODOS" ? "checked" : ""}
            onClick={(e) => {
              e.preventDefault();

              SelecionaCategoria("TODOS");
            }}
          >
            Todos
          </button>

          <button
            type="button"
            className={categoriaSelecionada === "CAMISA" ? "checked" : ""}
            onClick={(e) => {
              e.preventDefault();
              SelecionaCategoria("CAMISA");
            }}
          >
            Camisa
          </button>

          <button
            className={categoriaSelecionada === "CALÇA" ? "checked" : ""}
            onClick={(e) => {
              e.preventDefault();
              SelecionaCategoria("CALÇA");
            }}
          >
            Calça
          </button>

          <button
            className={categoriaSelecionada === "SHORTS" ? "checked" : ""}
            onClick={(e) => {
              e.preventDefault();
              SelecionaCategoria("SHORTS");
            }}
          >
            Shorts
          </button>

          <button
            className={categoriaSelecionada === "BLUSA" ? "checked" : ""}
            onClick={(e) => {
              e.preventDefault();
              SelecionaCategoria("BLUSA");
            }}
          >
            Blusa
          </button>

          <button
            className={categoriaSelecionada === "JAQUETA" ? "checked" : ""}
            onClick={(e) => {
              e.preventDefault();
              SelecionaCategoria("JAQUETA");
            }}
          >
            Jaqueta
          </button>

          <button
            className={categoriaSelecionada === "KIT" ? "checked" : ""}
            onClick={(e) => {
              e.preventDefault();
              SelecionaCategoria("KIT");
            }}
          >
            KIT
          </button>

          <button
            className={categoriaSelecionada === "ACESSORIOS" ? "checked" : ""}
            onClick={(e) => {
              e.preventDefault();
              SelecionaCategoria("ACESSORIOS");
            }}
          >
            Acessórios
          </button>
        </div>
      </section>
      <section className="container-produtos">
        <div className="text-prod">
          <h1>PRODUTOS</h1>
        </div>

        <div className="produtos">
          {Produtos.map((produto, index) => (
            <div
              className="card-produto"
              key={produto.id || `produto-${index}`}
              {...produto}
            >
              <div className="imagem-card">
                <img
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    detalhesProduto(produto.id);
                  }}
                  src={produto.imagem_url}
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null; // Evita loop infinito se a imagem alternativa também não carregar
                    if (produto.categoria === "camisa") {
                      e.target.src = "../img/products/prod1.jpeg";
                    }
                  }}
                />
              </div>

              <div className="lista-produtos">
                <div>
                  <h3>{produto.nome}</h3>
                  <h4>R$ {produto.preco.toFixed(2).replace(".", ",")}</h4>
                  <p className="limitar-texto" style={{ maxLines: "2" }}>
                    {produto.descricao}
                  </p>
                </div>
                <button onClick={() => AddCarrinho(produto.id)}>
                  Adicionar ao carrinho
                </button>
                <button className="btn-comprar">comprar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {ProdDet.length > 0 ? (
        <>
          <div id="fundoPreto"></div>
          <main id="ProdDetails">
            <div className="imgProd">
              <img src={ProdDet[0].imagem_url} alt="" />
              <p style={{ fontSize: "7px" }}>REF: {ProdDet[0].id}</p>
            </div>
            <article className="DIVProd">
              <div className="infoProduto">
                <h2 style={{ fontSize: "30px" }}>
                  {ProdDet[0].nome.toUpperCase()}
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    border: "1px solid goldenrod",
                    padding: "5px",
                    borderRadius: "5px",
                    boxShadow: "5px 5px 10px #0000005f",
                  }}
                >
                  {ProdDet[0].descricao.to()}
                </p>
                <div style={{ lineHeight: "0.5" }}>
                  <h3>
                    <span>R${ProdDet[0].preco.toFixed(2)}</span>
                  </h3>
                  <p>
                    Marca: <span> {ProdDet[0].marca.toUpperCase()}</span>
                  </p>
                  <p>
                    Material: <span> {ProdDet[0].material.toUpperCase()}</span>
                  </p>
                  <p>
                    Tamanhos disponiveis:
                    <span> {ProdDet[0].tamanho.toUpperCase()}</span>
                  </p>
                  <p>
                    Dimensões: <span>{ProdDet[0].dimensoes}</span>
                  </p>
                  <p>
                    Categoria: <span>{ProdDet[0].categoria}</span>
                  </p>
                  {ProdDet[0].cor}
                </div>
              </div>
              <div className="InfoProd2">
                <button
                  onClick={() => {
                    setProdDet([]);
                  }}
                >
                  Fechar
                </button>
                <button onClick={() => AddCarrinho(ProdDet[0].id)}>
                  Adicionar ao carrinho
                </button>
                <button className="btn-comprar">comprar</button>
              </div>
            </article>
          </main>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default InicioPropagandas;
