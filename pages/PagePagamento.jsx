import { useState, useEffect, useRef } from "react";
import "../src/css/pagamento.css";

function PagePagamento() {
  return (
    <>
      <main className="carrinho">
        <section className="ProdutosEserviços">
          <h2>PRODUTO e SERVIÇO</h2>
        </section>

        <section className="resumo-entrega">
          <div className="resumo">
            <h2>RESUMO</h2>
            <p>Valor dos produtos: {}</p>
            <p>Serviços Adicionais {}</p>
            <p>Frete: {}</p>
          </div>

          <div>
            <span>
              <p>Toptal a prazo: </p>
              <p>R${}</p>
            </span>

            <p>
              (em até {} de {} sem juros)
            </p>
          </div>

          <div>
            <span>
              <p>Valor a vista: R${}</p>
              <p>R${}</p>
            </span>

            <span>
              <p>Pix</p>
              <p>R${}</p>
            </span>
          </div>

          <div className="entrega"></div>
        </section>
      </main>
    </>
  );
}
export default PagePagamento;
