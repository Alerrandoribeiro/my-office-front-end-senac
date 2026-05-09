import React, { useRef } from "react";
import "./InputDate.css";

const InputDate = ({
  valor,
  cor = "padrao",
  aoAlterar,
  largura = "200px",
  altura = "50px",
  desabilitado = false,
}) => {
  const inputRef = useRef(null);

  const estilos = ["input-data_root"];

  switch (cor) {
    case "primaria":
      estilos.push("input-data_primario");
      break;

    case "erro":
      estilos.push("input-data_erro");
      break;

    default:
      estilos.push("input-data_padrao");
      break;
  }

  const abrirCalendario = () => {
    inputRef.current?.showPicker();
  };

  return (
    <input
      ref={inputRef}
      className={estilos.join(" ")}
      type="date"
      value={valor}
      onChange={aoAlterar}
      onClick={abrirCalendario}
      disabled={desabilitado}
      style={{
        width: largura,
        height: altura,
      }}
    />
  );
};

export default InputDate;
