import React, { useEffect, useState } from "react";

import PaginaInicial from "../PaginaInicial/PaginaInicial";

import "./PaginaTodasAsSalas.css";
import CardSala from "../../CardSala/CardSala";
import { buscarTodasSalas } from "../../../../service/salaService";

const PaginaTodasAsSalas = () => {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const buscarSalas = async () => {
      try {
        const data = await buscarTodasSalas();
        setSalas(data);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    };

    buscarSalas();
  }, []);

  return (
    <PaginaInicial>
      <div className="pagina-todas-salas_root">
        <div className="salas-grid">
          {salas.map((sala) => (
            <CardSala
              key={sala.idSala}
              salaId={sala.idSala}
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
    </PaginaInicial>
  );
};

export default PaginaTodasAsSalas;