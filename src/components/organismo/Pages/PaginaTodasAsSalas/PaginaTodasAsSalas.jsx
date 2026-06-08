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
        console.log("[PaginaTodasAsSalas] Salas recebidas:", data);
        if (data && data.length > 0) {
          console.log("[PaginaTodasAsSalas] Primeira sala:", data[0]);
          console.log("[PaginaTodasAsSalas] Chaves da primeira sala:", Object.keys(data[0]));
        }
        setSalas(data);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    };

    buscarSalas();
  }, []);

  return (
    <PaginaInicial>
      <div className="salas-grid">
        {salas.map((sala) => {
          console.log("[PaginaTodasAsSalas] Sala completa:", sala);
          console.log("[PaginaTodasAsSalas] Chaves da sala:", Object.keys(sala));
          console.log("[PaginaTodasAsSalas] sala.idSala:", sala.idSala, "sala.id:", sala.id, "sala.id_sala:", sala.id_sala);
          
          return (
          <CardSala
            key={sala.idSala || sala.id || sala.id_sala}
            salaId={sala.idSala || sala.id || sala.id_sala}
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
          );
        })}
      </div>
    </PaginaInicial>
  );
};

export default PaginaTodasAsSalas;