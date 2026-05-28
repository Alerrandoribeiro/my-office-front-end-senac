import { FaHome, FaUser, FaCalendarCheck } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import Botao from "../../atomos/Botao/Botao";
import AppBar from "../AppBar/AppBar";

const links = [
  {
    to: "/",
    texto: "Início",
    icone: <FaHome />
  },
  {
    to: "/cadastro-sala",
    texto: "Minhas Salas",
    icone: <MdMeetingRoom />
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
        />
      }
    />
  );
};

export default Pagina;