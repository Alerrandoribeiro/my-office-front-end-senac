import "./Botao.css";

const Botao = ({
  cor,
  aoClicar,
  children,
  texto,
  icone,
  onChange,
  largura,
  altura,
}) => {
  const estilos = ["botao-customizado_root"];

  switch (cor) {
    case "primaria":
      estilos.push("botao-customizado_primario");
      break;
    case "secundaria":
      estilos.push("botao-customizado_secundario");
      break;
    case "erro":
      estilos.push("botao-customizado_erro");
      break;
    default:
      estilos.push("botao-customizado_padrao");
      break;
  }

  return (
    <button
      className={estilos.join(" ")}
      onClick={aoClicar}
      onChange={onChange}
      style={{ width: largura, height: altura }}
    >
      {texto}
      {icone && <span className="botao-customizado_icone">{icone}</span>}
      {children}
    </button>
  );
};

export default Botao;
