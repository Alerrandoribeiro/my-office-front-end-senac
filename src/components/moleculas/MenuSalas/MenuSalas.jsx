import React, { useEffect, useState } from "react";
import {
  MdMeetingRoom,
  MdKeyboardArrowRight,
} from "react-icons/md";

import "./MenuSalas.css";

const MenuSalas = ({
  salaSelecionada,
  aoSelecionar,
}) => {
  const [salas, setSalas] = useState([]);

  useEffect(() => {
    const buscarSalas = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/salas"
        );

        const data = await response.json();

        setSalas(data);
      } catch (error) {
        console.error("Erro ao buscar salas:", error);
      }
    };

    buscarSalas();
  }, []);

  return (
    <div className="menu-salas_root">
      {salas.map((sala) => (
        <button
          key={sala.idSala}
          className={`menu-salas_item ${
            salaSelecionada === sala.idSala
              ? "menu-salas_item-ativo"
              : ""
          }`}
          onClick={() => aoSelecionar(sala)}
        >
          <div className="menu-salas_info">
            <MdMeetingRoom className="menu-salas_icon" />

            <div>
              <h3>{sala.nome || sala.tipoSala}</h3>
              <p>{sala.cidade}</p>
            </div>
          </div>

          <MdKeyboardArrowRight />
        </button>
      ))}
    </div>
  );
};

export default MenuSalas;