import "./CardSala.css";
import { formatarComMascara, MASCARA_CEP } from "../../utils/mascaras";

const CardSala = ({
  tipoSala,
  tipo,
  nome,
  descricao,
  capacidade,
  preco,
  rua,
  numero,
  bairro,
  cidade,
  estado,
  cep,
  imagem,
  actions,
}) => {
  const getImagemSrc = (value) => {
    if (!value) return null;
    const trimmed = String(value).trim();
    if (trimmed.startsWith("data:image/")) return trimmed;
    if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("/")) return trimmed;
    return `data:image/jpeg;base64,${trimmed}`;
  };

  const previewImagem =
    getImagemSrc(imagem) ||
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=60";

  return (
    <aside className="card-sala_root">
      <div className="card-sala_preview">
        <div className="card-sala_image-wrapper">
          <img
            src={previewImagem}
            alt="Visualização da sala"
            className="card-sala_image"
          />
        </div>
        <div className="card-sala_body">
          <span className="card-sala_tag">Prévia da Sala</span>
          <h2 className="card-sala_title">
            {tipoSala || tipo || nome || "Sala personalizada"}
          </h2>
          <p className="card-sala_description">
            {descricao || "Adicione a descrição da sala para ver como ela ficará no card."}
          </p>

          <div className="card-sala_details">
            <div>
              <strong>Capacidade</strong>
              <span>{capacidade || "--"} pessoas</span>
            </div>
            <div>
              <strong>Preço</strong>
              <span>{preco ? `R$ ${preco}` : "--"}</span>
            </div>
          </div>

          <div className="card-sala_location">
            <strong>Endereço</strong>
            <p>
              {rua || "Rua não informada"}, {numero || "--"}
            </p>
            <p>
              {bairro || "Bairro não informado"} · {cidade || "Cidade"} / {estado || "UF"}
            </p>
          </div>

          <div className="card-sala_footer">
            <span>CEP</span>
            <strong>{formatarComMascara(cep || "", MASCARA_CEP) || "00000-000"}</strong>
          </div>

          {actions && actions.length > 0 && (
            <div className="card-sala_actions">
              {actions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  className={`card-sala_action-button card-sala_action-button-${action.variant || "primary"}`}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default CardSala;
