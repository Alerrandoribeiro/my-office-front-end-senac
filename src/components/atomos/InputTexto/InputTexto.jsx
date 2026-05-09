import "./InputTexto.css";

const InputTexto = ({
  valor,
  tipo = "text",
  placeholder = "Digite aqui",
  cor = "padrao",
  aoAlterar,
  largura = "250px",
  altura = "50px",
  desabilitado = false,
}) => {
  const estilos = ["input-texto_root"];

  switch (cor) {
    case "primaria":
      estilos.push("input-texto_primario");
      break;

    case "erro":
      estilos.push("input-texto_erro");
      break;

    default:
      estilos.push("input-texto_padrao");
      break;
  }

  return (
    <input
      className={estilos.join(" ")}
      type={tipo}
      value={valor}
      placeholder={placeholder}
      onChange={aoAlterar}
      disabled={desabilitado}
      style={{
        width: largura,
        height: altura,
      }}
    />
  );
};

export default InputTexto;