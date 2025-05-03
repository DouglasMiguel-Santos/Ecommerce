/* eslint-disable react/prop-types */
import { CiSearch, CiUser } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { supabase } from "../Supabase";
import "../src/css/header.css";
import InicioPropagandas from "./inicioPropagandas";

import { useCarrinhoContext } from "../src/hook/useCarrinhoContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [QuantidadeIteM, setQuantidadeItem] = useState([]);
  const { carrinhoActive, setCarrinhoActive } = useCarrinhoContext();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //----------------------------------------------------------------------------------------------------
  //ADD OS PRODUTOS DO CARRINHO A VARIAVEL quantidadeItem

  useEffect(() => {
    quantidadeItem();
  }, [<InicioPropagandas />]);

  const quantidadeItem = async () => {
    const { data } = await supabase.from("carrinho").select("*");

    setQuantidadeItem(data);
  };

  //-----------------------------
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo-header">
        <h1>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault(); // para não dar reload ou pular para o topo do #
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ color: "black", textDecoration: "none", fontSize: "40px" }}
          >
            Ecommerce
          </a>
        </h1>
      </div>

      <div className="icons-header">
        <ul>
          <li>
            <Link to="/">
              <a>
                <CiUser />
                <span>login</span>
              </a>
            </Link>
            <Link to="/Cadastro">
              <a>
                <CiUser />
                <span>produtos</span>
              </a>
            </Link>

            <a href="#">
              <CiSearch />
              <span>Procurar</span>
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCarrinhoActive(true);
                console.log(carrinhoActive);
              }}
            >
              <IoBagHandleOutline />
              <span>Carrinho</span>
            </a>
          </li>
          <div className="bag-number">
            {QuantidadeIteM.length === 0 ? (
              <p>0</p>
            ) : (
              <p>{QuantidadeIteM.length}</p>
            )}
          </div>
        </ul>
      </div>
      {/* <Carrinho /> */}
    </header>
  );
};

export default Header;
