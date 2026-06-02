import React from "react";
import { useNavigate } from "react-router-dom";
import TemplatePaginaPadrao from "../../TemplatePaginaPadrao/TemplatePaginaPadrao";
import { obterUsuarioLogado } from "../../../utils/auth";
import "./PaginaMeuCadastro.css";

const PaginaMeuCadastro = () => {
  const navigate = useNavigate();
  const usuario = obterUsuarioLogado();

  if (!usuario) {
    return (
      <TemplatePaginaPadrao>
        <div className="pagina-meu-cadastro_root">
          <h1>Meu Cadastro</h1>
          <p>Nenhum usuário está logado no momento.</p>
          <button className="pagina-meu-cadastro_button" onClick={() => navigate("/login")}>Login</button>
        </div>
      </TemplatePaginaPadrao>
    );
  }

  return (
    <TemplatePaginaPadrao>
      <div className="pagina-meu-cadastro_root">
        <h1>Meu Cadastro</h1>

        <div className="pagina-meu-cadastro_card">
          <div className="pagina-meu-cadastro_item">
            <span className="pagina-meu-cadastro_label">Nome</span>
            <span>{usuario.nome || usuario.name || "-"}</span>
          </div>
          <div className="pagina-meu-cadastro_item">
            <span className="pagina-meu-cadastro_label">Email</span>
            <span>{usuario.email || "-"}</span>
          </div>
          <div className="pagina-meu-cadastro_item">
            <span className="pagina-meu-cadastro_label">Telefone</span>
            <span>{usuario.telefone || usuario.phone || "-"}</span>
          </div>
          <div className="pagina-meu-cadastro_item">
            <span className="pagina-meu-cadastro_label">ID</span>
            <span>{usuario.idUsuario || usuario.id || "-"}</span>
          </div>
        </div>
      </div>
    </TemplatePaginaPadrao>
  );
};

export default PaginaMeuCadastro;
