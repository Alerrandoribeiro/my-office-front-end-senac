import InputTexto from "../../atomos/InputTexto/InputTexto";
import "./InputComLabel.css";

const InputComLabel = ({
  label = "Label",
  obrigatorio = false,
  mensagemErro = "",
  valor,
  tipo,
  placeholder,
  cor,
  aoAlterar,
  aoBlur,
  largura,
  altura,
  desabilitado,
}) => {
  return (
    <div className="input-com-label_root">
      <label className="input-com-label_label">
        {label}

        {obrigatorio && <span className="input-com-label_obrigatorio">*</span>}
      </label>

      <InputTexto
        valor={valor}
        tipo={tipo}
        placeholder={placeholder}
        cor={cor}
        aoAlterar={aoAlterar}
        aoBlur={aoBlur}
        largura={largura}
        altura={altura}
        desabilitado={desabilitado}
      />

      {mensagemErro && (
        <span className="input-com-label_helper">{mensagemErro}</span>
      )}
    </div>
  );
};

export default InputComLabel;
