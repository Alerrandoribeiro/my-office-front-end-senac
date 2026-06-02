import React, { useEffect, useState } from "react";

import PaginaInicialUsuarioLogado from "../PaginaInicialUsuarioLogado/PaginaInicialUsuarioLogado";

import { obterUsuarioLogado } from "../../../utils/auth";

import "./PaginaMinhasSalas.css";
import CardSala from "../../CardSala/CardSala";

const PaginaMinhasSalas = () => {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const buscarMinhasSalas = async () => {
      try {
        const usuario = obterUsuarioLogado();

        if (!usuario) {
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/salas/${usuario.idUsuario}`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar salas");
        }

        const data = await response.json();

        setSalas(data);
      } catch (error) {
        console.error(error);
      }
    };

    buscarMinhasSalas();
  }, []);

  return (
    <PaginaInicialUsuarioLogado>
      <div className="pagina-minhas-salas_root">
        <h1>Minhas Salas</h1>

        <div className="salas-grid">
          {salas.map((sala) => (
            <CardSala
              key={sala.idSala}
              tipoSala={sala.tipoSala}
              descricao={sala.descricao}
              capacidade={sala.capacidade}
              preco={sala.preco}
              rua={sala.rua}
              numero={sala.numero}
              bairro={sala.bairro}
              cidade={sala.cidade}
              estado={sala.estado}
              cep={sala.cep}
              imagem={sala.imagem}
            />
          ))}
        </div>
      </div>
    </PaginaInicialUsuarioLogado>
  );
};

export default PaginaMinhasSalas;