import React from "react";
import {
  MdMeetingRoom,
  MdKeyboardArrowRight,
} from "react-icons/md";

import "./MenuSalas.css";

const MenuSalas = ({
  salas = [],
  salaSelecionada,
  aoSelecionar,
}) => {
  return (
    <div className="menu-salas_root">
      {salas.map((sala) => (
        <button
          key={sala.id}
          className={`menu-salas_item ${
            salaSelecionada === sala.id
              ? "menu-salas_item-ativo"
              : ""
          }`}
          onClick={() => aoSelecionar(sala)}
        >
          <div className="menu-salas_info">
            <MdMeetingRoom />

            <span>{sala.nome}</span>
          </div>

          <MdKeyboardArrowRight />
        </button>
      ))}
    </div>
  );
};

export default MenuSalas;

/**   
 * Como usar:
 *   <MenuSalas salas={[
    { id: 1, nome: "Sala Reunião" },
    { id: 2, nome: "Sala TI" },
    { id: 3, nome: "Sala RH" },
  ]}
  salaSelecionada={1}
  aoSelecionar={(sala) => console.log(sala)} />
    </> */

