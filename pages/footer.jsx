import { MdDeveloperMode } from "react-icons/md";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import "../src/css/footer.css";

function Footer() {
  return (
    <footer>
      <div className="div-footer">
        <div className="footer-img">
          <h2>Ecommerce</h2>
        </div>

        <div className="footer-links">
          <a href="#">Início</a>
          <a href="#">Sobre nós</a>
          <a href="#">todos os produtos</a>
        </div>

        <div className="footer-social">
          <FaInstagram />
          <FaFacebookF />
        </div>
      </div>

      <div className="footer2">
        <p>
          2024 Ecommerce. <IoBagHandleOutline />
        </p>
        <p>Todos os direitos reservados. ©</p>
        <p>
          Desenvolvido por Douglas Miguel. <MdDeveloperMode />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
