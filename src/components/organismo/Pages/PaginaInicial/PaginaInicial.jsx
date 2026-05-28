import React from "react";

import TemplatePaginaPadrao from "../../TemplatePaginaPadrao/TemplatePaginaPadrao";
import AppBar from "../../AppBar/AppBar";

import { FaHome } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

import Botao from "../../../atomos/Botao/Botao";

import { useNavigate } from "react-router-dom";
import Pesquisar from "../../../moleculas/Pesquisar/Pesquisar";

const PaginaInicial = ({ children }) => {
    const navigate = useNavigate();
  
    return (
      <TemplatePaginaPadrao
        appbar={
          <AppBar
            logo={{
              to: "/",
              texto: "MyOffice"
            }}
            links={[
              {
                to: "/",
                texto: "Início",
                icone: <FaHome />
              },
              {
                to: "/todas-salas",
                texto: "Todas as salas",
                icone: <MdMeetingRoom />
              },
              {
                to: "/cadastro-usuario",
                texto: "Cadastre-se",
                icone: <FaUserPlus />
              },
              {
                to: "/quem-somos",
                texto: "Quem somos ?",
                icone: <FaUsers />
              }
            ]}
            actions={
              <Botao
                texto="Login"
                cor="primaria"
                altura={35}
                largura={80}
                arredondamento={12}
                tamanhoFonte={15}
                aoClicar={() => navigate("/login")}
              />
            }
          />
        }
      >
        {children}
      </TemplatePaginaPadrao>
    );
  };

export default PaginaInicial;