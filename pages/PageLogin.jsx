import "../src/css/login.css";
import { useRef, useState } from "react";
import { supabase } from "../Supabase";
import { useNavigate } from "react-router-dom";

function PageLogin() {
  const Login = useRef(null);
  const Cadastro = useRef(null);
  const [Loginvisivel, setLoginVisivel] = useState(false);
  const [Loginvisivel2, setLoginVisivel2] = useState(true);
  const [Cadastrovisivel, setCadastroVisivel] = useState(false);
  const [Cadastrovisivel2, setCadastroVisivel2] = useState(true);

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [LoginEmail, setLoginEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [LoginSenha, setLoginSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const [userCredetials, setUserCredetials] = useState({});

  //CADASTRAR UM NOVO USUARIO

  async function CadastrarUsuario(
    e,
    nome,
    sobrenome,
    email,
    senha,
    confirmarSenha
  ) {
    e.preventDefault();

    const { data } = await supabase.from("usuarios").select("*");
    if (data) {
      setUsuarios(data);
    } else {
      setUsuarios([]);
    }

    if (!senha || !confirmarSenha || senha !== confirmarSenha) {
      alert("Senha incorreta, por favor insira uma senha válida.");
      return;
    } else if (usuarios.map((item) => item.email === email)) {
      alert("email ja cadastrado");
      return;
    }

    try {
      const { error } = await supabase.from("usuarios").insert([
        {
          nome: nome,
          sobrenome: sobrenome,
          email: email,
          senha: senha, // Idealmente, use bcrypt para armazenar a senha criptografada
        },
      ]);

      if (error) {
        console.error("Erro ao criar usuário:", error);
        alert("Erro ao cadastrar usuário. Tente novamente.");
        return;
      }

      alert("Usuário cadastrado com sucesso!");
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Ocorreu um erro inesperado. Tente novamente.");
    }
  }

  //FUNCAO PARA ACESSAR A PAGINA QUANDO JA TEM LOGIN
  async function Acessar(LoginEmail, LoginSenha) {
    const { data, error } = await supabase
      .from("usuarios")
      .select("id, email, senha")
      .eq("email", LoginEmail)
      .single();

    if (error) {
      console.error("Erro ao buscar usuário:", error.message);
      alert("Usuario nao localizado");
      return { success: false, message: "Usuário não encontrado" };
    }

    // Comparar senha (se armazenada em texto plano)
    if (data.senha !== LoginSenha) {
      alert("Senha incorreta");
      return { success: false, message: "Senha incorreta" };
    }
    // Redirecionar após login bem-sucedido
    navigate("/App");
    return { success: true, message: "Login bem-sucedido", user: data };
  }

  //FAZER APARECCER OU DESAPARECER O LOGIN
  function FazerLogin() {
    if (Loginvisivel) {
      setLoginVisivel(false);
      setLoginVisivel2(true);
    } // Define como fechado
    else {
      setLoginVisivel(true);
      setLoginVisivel2(false);
    }
  }
  //FAZER APARECCER OU DESAPARECER O CADASTRO
  function FazerCadastro() {
    if (Cadastrovisivel) {
      setCadastroVisivel(false);
      setCadastroVisivel2(true);
    } // Define como fechado
    else {
      setCadastroVisivel(true);
      setCadastroVisivel2(false);
    }
  }
  //------------------------------------------------------------------------------------------------
  return (
    <section className="SectionPrincipal">
      <div className="Titulo">
        <h1>CONECTE-SE AQUI!</h1>
      </div>

      <div className="fazer-Login">
        <section
          id="page-login"
          style={{ display: Loginvisivel2 ? "flex" : "none" }}
        >
          <h2>JÁ TEM UMA CONTA ?</h2>
          <p>Clique no botão a baixo e faça login para acessar sua conta</p>
          <button onClick={FazerLogin}>ENTRAR</button>
        </section>

        <section
          ref={Login}
          style={{ display: Loginvisivel ? "flex" : "none" }}
          id="login"
        >
          <div className="formLogin">
            <h2>JÁ SOU CLIENTE</h2>
            <input
              name="Email"
              required
              value={LoginEmail}
              type="email"
              placeholder="E-mail"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              name="Senha"
              value={LoginSenha}
              required
              type="password"
              placeholder="Senha"
              onChange={(e) => setLoginSenha(e.target.value)}
            />
            <div>
              <a href="#">esqueci minha senha</a>

              <button onClick={(e) => Acessar(LoginEmail, LoginSenha)}>
                ENTRAR
              </button>

              <a href="#" onClick={FazerLogin}>
                voltar
              </a>
            </div>
          </div>
        </section>

        <section
          id="page-login"
          style={{ display: Cadastrovisivel2 ? "flex" : "none" }}
        >
          <h2>NÃO POSSUI CADASTRO?</h2>
          <p>Clique no botão a baixo e cadastre-se</p>
          <button onClick={FazerCadastro}>CRIAR CONTA</button>
        </section>

        <section
          ref={Cadastro}
          id="login"
          style={{ display: Cadastrovisivel ? "flex" : "none" }}
        >
          <div className="formLogin2">
            <div>
              <h2>AINDA NÃO TENHO CADASTRO</h2>
            </div>

            <form>
              <div className="form-2">
                <input
                  required
                  value={nome}
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => setNome(e.target.value)}
                />
                <input
                  required
                  value={sobrenome}
                  type="text"
                  placeholder="Sobrenome"
                  onChange={(e) => setSobrenome(e.target.value)}
                />
              </div>

              <div className="form-1">
                <input
                  required
                  value={email}
                  type="email"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-2">
                <input
                  required
                  value={senha}
                  type="password"
                  placeholder="Senha"
                  onChange={(e) => setSenha(e.target.value)}
                />
                <input
                  required
                  value={confirmarSenha}
                  type="password"
                  placeholder="Confirmar Senha"
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                />
              </div>
              <div className="div-registrar">
                <button
                  type="submit"
                  onClick={(e) =>
                    CadastrarUsuario(
                      e,
                      nome,
                      sobrenome,
                      email,
                      senha,
                      confirmarSenha
                    )
                  }
                >
                  REGISTRAR
                </button>
                <a href="#" onClick={FazerCadastro}>
                  voltar
                </a>
              </div>
            </form>
          </div>
        </section>
      </div>
    </section>
  );
}
export default PageLogin;
