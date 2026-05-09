import React from "react";
import "./Avatar.css";

const Avatar = ({
  imagem,
  nome = "Usuário",
  tamanho = "60px",
  borda = false,
  aoClicar,
}) => {
  return (
    <div
      className={`avatar_root ${borda ? "avatar_borda" : ""}`}
      onClick={aoClicar}
      style={{
        width: tamanho,
        height: tamanho,
      }}
    >
      {imagem ? (
        <img
          src={imagem}
          alt={nome}
          className="avatar_imagem"
        />
      ) : (
        <span className="avatar_texto">
          {nome.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Avatar;