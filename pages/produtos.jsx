import { useEffect, useState } from "react";
import "../src/css/cadastroProdutos.css";

import { supabase } from "../Supabase";

function ProductsPage() {
  const [Produtos, setProdutos] = useState([]);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [preco_custo, setPrecoCusto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tamanho, setTamanho] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [dimensoes, setDimensoes] = useState("");
  const [material, setMaterial] = useState("");
  const [cor, setCor] = useState("");
  const [marca, setMarca] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [imagemProp, setImagemProp] = useState(null);

  // const handleFileChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   setFile(selectedFile);
  // };

  // const handleUpload = async () => {
  //   if (!file) {
  //     alert("Selecione uma imagem primeiro!");
  //     return;
  //   }

  //   const fileName = `${Date.now()}-${file.name}`; // Evita arquivos com o mesmo nome
  //   const { data, error } = await supabase.storage
  //     .from("produtos") // Nome do bucket
  //     .upload(fileName, file);

  //   if (error) {
  //     console.error("Erro ao fazer upload:", error);
  //     return;
  //   }

  //   // Gerando a URL pública
  //   const { data: publicUrlData } = supabase.storage
  //     .from("produtos")
  //     .getPublicUrl(fileName);

  //   setImg(publicUrlData.publicUrl);
  //   alert("Upload realizado com sucesso!");
  // };

  //salva na variavel Produtos os produtos do banco de dados
  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    const { data } = await supabase.from("produtos").select("*");

    setProdutos(data);

    return Produtos;
  };

  async function deletarProduto(id) {
    const { error } = await supabase.from("produtos").delete().eq("id", id);
    if (error) {
      console.error("Erro ao deletar produto:", error);
      return;
    }
    setProdutos((prevProdutos) =>
      prevProdutos.filter((produto) => produto.id !== id)
    );
  }

  async function deletarTodos() {
    const { error } = await supabase.from("produtos").delete().neq("id", 0);

    if (error) {
      console.error("Erro ao deletar produtos:", error.message);
    } else {
      console.log("Todos os produtos foram deletados com sucesso.");
    }
  }

  async function CadastroProdutos(e) {
    e.preventDefault();

    if (!imagemFile) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    // Upload da imagem para o bucket correto
    const fileName = `${Date.now()}_${imagemFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("imagens-produtos") // bucket correto
      .upload(`imagens-produtos/${fileName}`, imagemFile);

    if (uploadError) {
      console.error("Erro ao fazer upload da imagem:", uploadError);
      return;
    }

    // Gerar URL pública da imagem no mesmo bucket
    const { data: publicUrlData } = supabase.storage
      .from("imagens-produtos")
      .getPublicUrl(`imagens-produtos/${fileName}`);

    const imagem_url_final = publicUrlData.publicUrl;

    // Agora insere o produto no banco com a imagem_url_final
    const { data, error } = await supabase.from("produtos").insert([
      {
        nome,
        preco,
        preco_custo,
        descricao,
        categoria,
        tamanho,
        dimensoes,
        marca,
        material,
        cor,
        parcelas,
        imagem_url: imagem_url_final,
      },
    ]);

    if (error) {
      console.error("Erro ao registrar:", error);
    } else {
      alert("Produto registrado com sucesso!");
      // Limpar formulário após o sucesso
      setNome("");
      setPreco("");
      setPrecoCusto("");
      setDescricao("");
      setCategoria("");
      setTamanho("");
      setDimensoes("");
      setMarca("");
      setMaterial("");
      setCor("");
      setParcelas("");
      setImagemFile(null);
    }

    fetchProdutos();
  }

  //------------------------------------------------------------------------------------------------
  async function carregarPropaganda(e) {
    e.preventDefault();
    if (!imagemProp) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    // Upload da imagem para o bucket correto
    const fileName = `${Date.now()}_${imagemProp.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("imagens-propaganda") // bucket correto
      .upload(`imagens-propaganda/${fileName}`, imagemProp);

    if (uploadError) {
      console.error("Erro ao fazer upload da imagem:", uploadError);
      return;
    }
    // Gerar URL pública da imagem no mesmo bucket
    const { data: publicUrlData } = supabase.storage
      .from("imagens-propaganda")
      .getPublicUrl(`imagens-propaganda/${fileName}`);

    const imagem_url_prop = publicUrlData.publicUrl;

    // Agora insere o produto no banco com a imagem_url_final
    const { data, error } = await supabase.from("imagem_prop").insert([
      {
        image: imagem_url_prop,
      },
    ]);

    if (error) {
      console.error("Erro ao registrar:", error);
    } else {
      alert("Produto registrado com sucesso!");
      // Limpar formulário após o sucesso

      setImagemProp(null);
    }
  }
  //------------------------------------------------------------------------------------------------
  return (
    <>
      <section id="container">
        <div id="Formulario-produtos">
          <h1>Cadastro de Produtos</h1>
          <form onSubmit={CadastroProdutos} className="product-form">
            <div className="form-group">
              <label>Nome do produto</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Preço</label>
                <input
                  type="number"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Preço de custo</label>
                <input
                  type="number"
                  value={preco_custo}
                  onChange={(e) => setPrecoCusto(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                maxlength="100"
                placeholder="Max 100 caracteres"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Categoria</label>
                <input
                  type="text"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value.toUpperCase())}
                />
              </div>
              <div className="form-group">
                <label>Tamanho</label>
                <input
                  type="text"
                  value={tamanho}
                  onChange={(e) => setTamanho(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Dimensões</label>
                <input
                  type="text"
                  value={dimensoes}
                  onChange={(e) => setDimensoes(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Marca</label>
                <input
                  type="text"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Cor</label>
                <input
                  type="text"
                  value={cor}
                  onChange={(e) => setCor(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Máximo de Parcelas</label>
              <input
                type="number"
                value={parcelas}
                onChange={(e) => setParcelas(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Imagem</label>
              <input
                type="file"
                onChange={(e) => setImagemFile(e.target.files[0])}
              />
            </div>

            <div className="form-actions">
              <button type="submit">Cadastrar</button>
              <button
                disabled
                onClick={(e) => {
                  e.preventDefault();
                  deletarTodos();
                }}
              >
                del all
              </button>
            </div>
          </form>
        </div>

        <div id="lista-produtos">
          <h2>Lista de Produtos</h2>
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Preço de custo</th>
                <th>Categoria</th>
                <th>Tamanhos</th>
                <th>Parcelas maximas</th>
                <th id="td-dlt">Apagar/ Editar</th>
              </tr>
            </thead>

            {Array.isArray(Produtos) && Produtos.length > 0 ? (
              Produtos.map((produto, index) => (
                <tbody key={index}>
                  <tr
                    style={{
                      backgroundColor: index % 2 === 0 ? "#dfdfdf" : "white",
                      color: index % 2 === 0 ? "black" : "black",
                    }}
                  >
                    <td>
                      <img id="imagemLista" src={produto.imagem_url} alt="" />
                    </td>
                    <td>{produto.nome}</td>
                    <td>R$ {produto.preco.toFixed(2).replace(".", ",")}</td>

                    <td>
                      R$ {produto.preco_custo.toFixed(2).replace(".", ",")}
                    </td>
                    {/* <p>Descrição: {produto.descricao}</p> */}
                    <td>{produto.categoria}</td>
                    <td>{produto.tamanho}</td>
                    <td>{produto.parcelas}X</td>
                    <td id="td-dlt">
                      <button
                        id="BTN-DelProd"
                        onClick={() => deletarProduto(produto.id)}
                      >
                        Apagar
                      </button>
                      <button id="BTN-editProd">Editar</button>
                    </td>

                    {produto.img && (
                      <img
                        src={`${produto.imagem_url}`}
                        alt={produto.nome}
                        width="100"
                      />
                    )}
                  </tr>
                </tbody>
              ))
            ) : (
              <p>Não há produtos cadastrados.</p>
            )}
          </table>
        </div>
      </section>
      <section className="">
        <div>
          <form action="">
            <label htmlFor=""> carregue aqui sua propaganda</label>
            <input
              type="file"
              onChange={(e) => setImagemProp(e.target.files[0])}
            />
            <button
              type="submit"
              onClick={(e) => {
                carregarPropaganda(e);
              }}
            >
              salvar
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ProductsPage;
