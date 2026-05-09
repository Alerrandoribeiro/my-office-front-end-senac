import { MdSearch } from "react-icons/md";

import "./Pesquisar.css";
import Botao from "../../atomos/Botao/Botao";
import InputTexto from "../../atomos/InputTexto/InputTexto";
const Pesquisar = ({
  valor,
  aoAlterar,
  aoPesquisar,
  placeholder = "Pesquisar...",
  larguraInput = "250px",
  alturaInput = "50px",
  larguraBotao = "140px",
  alturaBotao = "50px",
  corDoBotaoPesquisar = "primaria",
}) => {
  return (
    <div className="pesquisar_root">
      <InputTexto
        valor={valor}
        placeholder={placeholder}
        aoAlterar={aoAlterar}
        largura={larguraInput}
        altura={alturaInput}
      />

      <Botao
        texto="Pesquisar"
        cor={corDoBotaoPesquisar}
        aoClicar={aoPesquisar}
        largura={larguraBotao}
        altura={alturaBotao}
        icone={<MdSearch />}
      />
    </div>
  );
};

export default Pesquisar;