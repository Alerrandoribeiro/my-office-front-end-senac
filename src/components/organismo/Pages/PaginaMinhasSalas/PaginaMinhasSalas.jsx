import React, { useEffect, useState } from "react";
import "./PaginaMinhasSalas.css";
import TemplatePaginaPadrao from "../../TemplatePaginaPadrao/TemplatePaginaPadrao";
import AppBar from "../../AppBar/AppBar";
import { obterUsuarioLogado } from "../../../utils/auth";
import { buscarSalasDoUsuario, excluirSala, atualizarSala } from "../../../../service/salaService";
import { buscarReservasPorSala } from "../../../../service/reservaService";
import { buscarEnderecoPorCep } from "../../../../service/cepService";
import CardSala from "../../CardSala/CardSala";
import Modal from "../../../atomos/Modal/Modal";
import { formatarComMascara, MASCARA_CEP } from "../../../utils/mascaras";
import { toast } from "react-toastify";

const PaginaMinhasSalas = () => {
  const [salas, setSalas] = useState([]);
  const [salaEmEdicao, setSalaEmEdicao] = useState(null);
  const [imagemPreview, setImagemPreview] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const obterSalaId = (sala) => sala?.id_sala || sala?.idSala || sala?.id;

  const carregarSalas = async () => {
    try {
      setCarregando(true);
      setErro("");

      const usuario = obterUsuarioLogado();
      if (!usuario) {
        setErro("Usuário não está logado.");
        return;
      }

      const userId = usuario?.idUsuario || usuario?.id;
      if (!userId) {
        setErro("ID do usuário não encontrado.");
        return;
      }

      const data = await buscarSalasDoUsuario(userId);
      console.log("[PaginaMinhasSalas] Salas recebidas:", data);
      if (data && data.length > 0) {
        console.log("[PaginaMinhasSalas] Primeira sala:", data[0]);
        console.log("[PaginaMinhasSalas] Chaves da primeira sala:", Object.keys(data[0]));
      }
      setSalas(data);
    } catch (fetchError) {
      console.error(fetchError);
      setErro(fetchError.message || "Erro ao buscar salas");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarSalas();
  }, []);

  const iniciarEdicao = (sala) => {
    setSalaEmEdicao({
      ...sala,
      tipoSala: sala.tipoSala || sala.tipo || sala.nome || "",
    });
  };

  const cancelarEdicao = () => {
    setSalaEmEdicao(null);
  };

  const handleExcluirSala = async (id) => {
    try {
      // Verificar se a sala tem reservas ativas
      const reservasSala = await buscarReservasPorSala(id);
      
      if (reservasSala && reservasSala.length > 0) {
        const msg = "Não é possível excluir uma sala que possui reservas";
        toast.error(msg);
        return;
      }

      if (!window.confirm("Deseja realmente excluir esta sala?")) {
        return;
      }

      await excluirSala(id);
      setSalas((prev) => prev.filter((s) => obterSalaId(s) !== id));
      toast.success("Sala excluída com sucesso!");
    } catch (deleteError) {
      console.error(deleteError);
      toast.error(deleteError.message || "Erro ao excluir sala");
    }
  };

  const buscarCepEdicao = async (valorCep) => {
    const cepSemMascara = String(valorCep).replace(/\D/g, "");

    if (cepSemMascara.length !== 8) return;

    try {
      const data = await buscarEnderecoPorCep(cepSemMascara);
      setSalaEmEdicao((prev) => ({
        ...prev,
        rua: data.street || prev?.rua || "",
        bairro: data.neighborhood || prev?.bairro || "",
        cidade: data.city || prev?.cidade || "",
        estado: data.state || prev?.estado || "",
        latitude:
          data.location?.coordinates?.latitude ?? prev?.latitude ?? "",
        longitude:
          data.location?.coordinates?.longitude ?? prev?.longitude ?? "",
      }));
    } catch (error) {
      console.error("CEP não encontrado:", error);
    }
  };

  useEffect(() => {
    if (!salaEmEdicao) {
      setImagemPreview("");
      return;
    }

    if (salaEmEdicao.imagemArquivo) {
      const objectUrl = URL.createObjectURL(salaEmEdicao.imagemArquivo);
      setImagemPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    setImagemPreview(salaEmEdicao.imagem || "");
  }, [salaEmEdicao]);

  const carregarImagemComoBase64 = (arquivo) => {
    return new Promise((resolve, reject) => {
      if (!arquivo) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(arquivo);
    });
  };

  const handleSalvarEdicao = async (event) => {
    event.preventDefault();

    if (!salaEmEdicao) {
      return;
    }

    try {
      const salaId = obterSalaId(salaEmEdicao);
      const payload = { ...salaEmEdicao };

      if (salaEmEdicao.imagemArquivo) {
        const imagemBase64 = await carregarImagemComoBase64(
          salaEmEdicao.imagemArquivo
        );
        payload.imagem = imagemBase64;
      }

      delete payload.imagemArquivo;

      if (payload.tipoSala) {
        payload.tipo = payload.tipoSala;
        payload.tipo_sala = payload.tipoSala;
      }

      const salaAtualizada = await atualizarSala(salaId, payload);
      setSalas((prev) =>
        prev.map((s) =>
          obterSalaId(s) === obterSalaId(salaAtualizada) ? salaAtualizada : s
        )
      );
      setSalaEmEdicao(null);
      toast.success("Sala atualizada com sucesso!");
    } catch (updateError) {
      console.error(updateError);
      toast.error(updateError.message || "Erro ao atualizar sala");
    }
  };

  const handleCampoEdicao = (campo, valor) => {
    setSalaEmEdicao((prev) => ({ ...prev, [campo]: valor }));
  };

  return (
    <TemplatePaginaPadrao
      appbar={
        <AppBar
          logo={{
            to: "/todas-salas",
            texto: "MyOffice"
          }}
          links={[]}
        />
      }
    >
      <div className="pagina-minhas-salas_root">
        <h1>Minhas Salas</h1>

        {erro && <p className="pagina-minhas-salas_error">{erro}</p>}

        {salaEmEdicao && (
          <Modal
            title="Editar sala"
            description="Altere os dados da sala e salve para aplicar."
            onClose={cancelarEdicao}
          >
            <form onSubmit={handleSalvarEdicao}>
              <div className="modal_form-row">
                <label>
                  CEP
                  <input
                    value={salaEmEdicao.cep || ""}
                    onChange={(e) => {
                      const valor = formatarComMascara(e.target.value, MASCARA_CEP);
                      handleCampoEdicao("cep", valor);
                      buscarCepEdicao(valor);
                    }}
                  />
                </label>
                <label>
                  Estado
                  <input
                    value={salaEmEdicao.estado || ""}
                    onChange={(e) => handleCampoEdicao("estado", e.target.value)}
                  />
                </label>
              </div>

              <div className="modal_form-row">
                <label>
                  Cidade
                  <input
                    value={salaEmEdicao.cidade || ""}
                    onChange={(e) => handleCampoEdicao("cidade", e.target.value)}
                  />
                </label>
                <label>
                  Bairro
                  <input
                    value={salaEmEdicao.bairro || ""}
                    onChange={(e) => handleCampoEdicao("bairro", e.target.value)}
                  />
                </label>
              </div>

              <div className="modal_form-row">
                <label>
                  Rua
                  <input
                    value={salaEmEdicao.rua || ""}
                    onChange={(e) => handleCampoEdicao("rua", e.target.value)}
                  />
                </label>
                <label>
                  Número
                  <input
                    value={salaEmEdicao.numero || ""}
                    onChange={(e) => handleCampoEdicao("numero", e.target.value)}
                  />
                </label>
              </div>

              <div className="modal_form-row">
                <label>
                  Preço
                  <input
                    value={salaEmEdicao.preco || ""}
                    onChange={(e) => handleCampoEdicao("preco", e.target.value)}
                  />
                </label>
                <label>
                  Capacidade
                  <input
                    value={salaEmEdicao.capacidade || ""}
                    onChange={(e) => handleCampoEdicao("capacidade", e.target.value)}
                  />
                </label>
              </div>

              <div className="modal_form-row">
                <label>
                  Tipo da sala
                  <input
                    value={salaEmEdicao.tipoSala || ""}
                    onChange={(e) => handleCampoEdicao("tipoSala", e.target.value)}
                  />
                </label>
                <label>
                  Upload da imagem
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleCampoEdicao(
                        "imagemArquivo",
                        e.target.files?.[0] || null
                      )
                    }
                  />
                </label>
              </div>

              {imagemPreview && (
                <div className="modal_image-preview">
                  <img src={imagemPreview} alt="Preview da sala" />
                </div>
              )}

              <label>
                Descrição
                <textarea
                  value={salaEmEdicao.descricao || ""}
                  onChange={(e) => handleCampoEdicao("descricao", e.target.value)}
                />
              </label>

              <div className="pagina-minhas-salas_edit-actions">
                <button type="submit">Salvar alterações</button>
                <button type="button" onClick={cancelarEdicao} className="secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>
        )}

        {carregando ? (
          <p>Carregando salas...</p>
        ) : (
          <div className="salas-grid">
            {Array.isArray(salas) && salas.length > 0 ? (
              salas.map((sala) => {
                const salaId = obterSalaId(sala);
                console.log("[PaginaMinhasSalas] Sala completa:", sala);
                console.log("[PaginaMinhasSalas] Chaves da sala:", Object.keys(sala));
                console.log("[PaginaMinhasSalas] salaId extraído:", salaId);
                
                return (
                <CardSala
                  key={salaId}
                  salaId={salaId}
                  tipoSala={sala.tipoSala}
                  tipo={sala.tipo}
                  nome={sala.nome}
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
                  actions={[
                    {
                      label: "Editar",
                      variant: "secondary",
                      onClick: () => iniciarEdicao(sala),
                    },
                    {
                      label: "Excluir",
                      variant: "danger",
                      onClick: () => handleExcluirSala(obterSalaId(sala)),
                    },
                  ]}
                />
                );
              })
            ) : (
              <p className="pagina-minhas-salas_empty">
                Nenhuma sala encontrada ou resposta inválida da API.
              </p>
            )}
          </div>
        )}
      </div>
    </TemplatePaginaPadrao>
  );
};

export default PaginaMinhasSalas;