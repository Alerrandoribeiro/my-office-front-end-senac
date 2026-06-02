import React, { useEffect, useState } from "react";

import TemplatePaginaPadrao from "../../TemplatePaginaPadrao/TemplatePaginaPadrao";
import AppBar from "../../AppBar/AppBar";

import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
} from "react-icons/fa";

import { MdMeetingRoom } from "react-icons/md";

import Botao from "../../../atomos/Botao/Botao";

import { useNavigate } from "react-router-dom";

import {
  obterUsuarioLogado,
  removerUsuarioLogado,
} from "../../../utils/auth";

const PaginaInicialUsuarioLogado = ({ children }) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    setUsuario(obterUsuarioLogado());
  }, []);

  const handleLogout = () => {
    removerUsuarioLogado();
    setUsuario(null);
    navigate("/");
  };

  return (
    <TemplatePaginaPadrao
      appbar={
        <AppBar
          logo={{
            to: "/",
            texto: "MyOffice",
          }}
          links={[
            {
              to: "/",
              texto: "Início",
              icone: <FaHome />,
            },
            {
              to: "/todas-salas",
              texto: "Todas as salas",
              icone: <MdMeetingRoom />,
            },
            {
              to: "/minhas-salas",
              texto: "Minhas Salas",
              icone: <FaBuilding />,
            },
            {
              to: "/minhas-reservas",
              texto: "Minhas Reservas",
              icone: <FaCalendarCheck />,
            },
            {
              to: "/quem-somos",
              texto: "Quem somos ?",
              icone: <FaUsers />,
            },
          ]}
          actions={
            usuario ? (
              <Botao
                texto="Sair"
                cor="erro"
                altura={35}
                largura={80}
                arredondamento={12}
                tamanhoFonte={15}
                aoClicar={handleLogout}
              />
            ) : (
              <Botao
                texto="Login"
                cor="primaria"
                altura={35}
                largura={80}
                arredondamento={12}
                tamanhoFonte={15}
                aoClicar={() => navigate("/login")}
              />
            )
          }
        />
      }
    >
      <div className="pagina-inicial_conteudo">
        {children}
      </div>
    </TemplatePaginaPadrao>
  );
};

export default PaginaInicialUsuarioLogado;