import { FaHome, FaUser, FaCalendarCheck, FaPlus } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import Botao from "../../atomos/Botao/Botao";
import AppBar from "../AppBar/AppBar";
import { useNavigate } from "react-router-dom";
import { removerUsuarioLogado } from "../../utils/auth";

const links = [
  {
    to: "/todas-salas",
    texto: "Início",
    icone: <FaHome />
  },
  {
    to: "/minhas-salas",
    texto: "Minhas Salas",
    icone: <MdMeetingRoom />
  },
  {
    to: "/cadastro-sala",
    texto: "Cadastrar Sala",
    icone: <FaPlus />
  },
  {
    to: "/reservas",
    texto: "Reservas",
    icone: <FaCalendarCheck />
  },
  {
    to: "/meu-cadastro",
    texto: "Meu Cadastro",
    icone: <FaUser />
  }
];

const Pagina = () => {
  const navigate = useNavigate();

  function handleLogout() {
    removerUsuarioLogado();
    navigate("/login");
  }

  return (
    <AppBar
      logo={{
        to: "/",
        texto: "MyOffice"
      }}
      links={links}
      actions={
        <Botao
          cor="primaria"
          altura={10}
          texto="Sair"
          icone={<IoLogOut />}
          aoClicar={handleLogout}
        />
      }
    />
  );
};

export default Pagina;