import { useState, useEffect, useRef } from "react";
import "../src/css/pagamento.css";
import { BiLogoVisa } from "react-icons/bi";
import { FcSimCardChip } from "react-icons/fc";
function PagePagamento() {
  const [CVV, setCVV] = useState();
  const [Nome, setNome] = useState();
  const [numCartao, setnumCartao] = useState();
  const [data, setData] = useState();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus(); // foca no input assim que a página carrega
  }, []);

  const handleChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    valor = valor.replace(/(.{4})/g, "$1 ").trim(); // Adiciona espaço a cada 4 números
    setnumCartao(valor);
  };

  return (
    <>
      <section style={{ marginTop: "80px", height: "100vh" }}>
        <div className="cartao">
          <div className="visa">
            <FcSimCardChip style={{ fontSize: "40px" }} />
            <BiLogoVisa />
          </div>

          <div className="numeracao">
            <p style={{ lineBreak: "3" }}>
              {numCartao ? numCartao : "####  ####  #### ####"}
            </p>
          </div>
          <div className="dadosGerais">
            <div className="dadosCartao">
              <h3>Nome impresso no cartão</h3>
              <p> {Nome ? Nome : "NOME COMPLETO"}</p>
            </div>

            <div className="dadosValidade">
              <h3>validade</h3>
              <p>MM/YY</p>
            </div>
          </div>
        </div>

        <div className="FormCartao">
          <form className="Form">
            <label> Numero do cartão</label>
            <input
              ref={inputRef}
              type="text"
              value={numCartao}
              onChange={handleChange}
              maxLength={19}
            />
            <label> Nome Completo </label>
            <input type="text" onChange={(e) => setNome(e.target.value)} />

            <div>
              <label> validade:</label>
              <select id="mes" name="mes" style={{ outline: "none" }}>
                <option value="" selected disabled>
                  Mês
                </option>
                <option value="01">Janeiro</option>
                <option value="02">fevereiro</option>
                <option value="03">março</option>
                <option value="04">abril</option>
                <option value="05">maio</option>
                <option value="06">junho</option>
                <option value="07">julho</option>
                <option value="08">agosto</option>
                <option value="09">setembro</option>
                <option value="10">outubro</option>
                <option value="11">novembro</option>
                <option value="12">dezembro</option>
              </select>
              <select name="" id="">
                <option value="" selected disabled>
                  ano
                </option>
              </select>
              <label>CVV</label>
              <input
                type="number"
                class="sem-seta"
                onChange={(e) => {
                  setCVV[e.target.value];
                }}
              />
            </div>
            <label>CPF</label>
            <input type="number" class="sem-seta" />
            <label>E-mail</label>
            <input type="email" />
            <button>Efetuar pagamento</button>
          </form>
        </div>
      </section>
    </>
  );
}
export default PagePagamento;
