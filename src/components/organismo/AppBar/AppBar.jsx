import "./AppBar.css";

import { FaHome, FaUser, FaCalendarCheck } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import Botao from "../../atomos/Botao/Botao";

const AppBar = () => {
  return (
    <header className="appbar">
      <div className="appbar-container">

        <a href="/" className="logo">
          MyOffice
        </a>

        <nav className="nav-links">

          <a href="/">
            <FaHome />
            <span>Início</span>
          </a>

          <a href="/">
            <MdMeetingRoom />
            <span>Minhas Salas</span>
          </a>

          <a href="/">
            <FaCalendarCheck />
            <span>Reservas</span>
          </a>

          <a href="/">
            <FaUser />
            <span>Meu Cadastro</span>
          </a>

        </nav>

        <div className="appbar-actions">
  <Botao
    cor="primaria"
    altura={10}
    texto={"Sair"}
    icone={<IoLogOut />}
  />
</div>

      </div>
    </header>
  );
};

export default AppBar;