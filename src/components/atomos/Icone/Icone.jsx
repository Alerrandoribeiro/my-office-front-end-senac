import "./Icone.css";

const Icone = ({
  icone,
  tamanho,
  cor,
  aoClicar,
  largura,
  altura,
}) => {
  return (
    <span
      className="icone_root"
      onClick={aoClicar}
      style={{
        fontSize: tamanho,
        color: cor,
        width: largura,
        height: altura,
      }}
    >
      {icone}
    </span>
  );
};

export default Icone;