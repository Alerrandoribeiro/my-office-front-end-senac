import React, { useEffect, useState } from "react";

import TemplatePaginaPadrao from "../../TemplatePaginaPadrao/TemplatePaginaPadrao";
import AppBar from "../../AppBar/AppBar";
import { obterUsuarioLogado } from "../../../utils/auth";
import { buscarSalasDoUsuario, excluirSala, atualizarSala } from "../../../../service/salaService";
import CardSala from "../../CardSala/CardSala";

const PaginaMinhasSalas = () => {
  const [salas, setSalas] = useState([]);
  const [salaEmEdicao, setSalaEmEdicao] = useState(null);
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
    setSalaEmEdicao({ ...sala });
  };

  const cancelarEdicao = () => {
    setSalaEmEdicao(null);
  };

  const handleExcluirSala = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta sala?")) {
      return;
    }

    try {
      await excluirSala(id);
      setSalas((prev) => prev.filter((s) => obterSalaId(s) !== id));
    } catch (deleteError) {
      console.error(deleteError);
      alert(deleteError.message || "Erro ao excluir sala");
    }
  };

  const handleSalvarEdicao = async (event) => {
    event.preventDefault();

    if (!salaEmEdicao) {
      return;
    }

    try {
      const salaId = obterSalaId(salaEmEdicao);
      const salaAtualizada = await atualizarSala(salaId, salaEmEdicao);
      setSalas((prev) =>
        prev.map((s) =>
          obterSalaId(s) === obterSalaId(salaAtualizada) ? salaAtualizada : s
        )
      );
      setSalaEmEdicao(null);
      alert("Sala atualizada com sucesso!");
    } catch (updateError) {
      console.error(updateError);
      alert(updateError.message || "Erro ao atualizar sala");
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
          <section className="pagina-minhas-salas_edit-form">
            <h2>Editar sala</h2>
            <form onSubmit={handleSalvarEdicao}>
              <div className="pagina-minhas-salas_form-row">
                <label>
                  Tipo de sala
                  <input
                    value={salaEmEdicao.tipoSala || ""}
                    onChange={(e) => handleCampoEdicao("tipoSala", e.target.value)}
                  />
                </label>
                <label>
                  Preço
                  <input
                    value={salaEmEdicao.preco || ""}
                    onChange={(e) => handleCampoEdicao("preco", e.target.value)}
                  />
                </label>
              </div>

              <label>
                Descrição
                <textarea
                  value={salaEmEdicao.descricao || ""}
                  onChange={(e) => handleCampoEdicao("descricao", e.target.value)}
                />
              </label>

              <div className="pagina-minhas-salas_form-row">
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

              <div className="pagina-minhas-salas_form-row">
                <label>
                  Bairro
                  <input
                    value={salaEmEdicao.bairro || ""}
                    onChange={(e) => handleCampoEdicao("bairro", e.target.value)}
                  />
                </label>
                <label>
                  Cidade
                  <input
                    value={salaEmEdicao.cidade || ""}
                    onChange={(e) => handleCampoEdicao("cidade", e.target.value)}
                  />
                </label>
              </div>

              <div className="pagina-minhas-salas_form-row">
                <label>
                  Estado
                  <input
                    value={salaEmEdicao.estado || ""}
                    onChange={(e) => handleCampoEdicao("estado", e.target.value)}
                  />
                </label>
                <label>
                  CEP
                  <input
                    value={salaEmEdicao.cep || ""}
                    onChange={(e) => handleCampoEdicao("cep", e.target.value)}
                  />
                </label>
              </div>

              <div className="pagina-minhas-salas_edit-actions">
                <button type="submit">Salvar alterações</button>
                <button type="button" onClick={cancelarEdicao} className="secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}

        {carregando ? (
          <p>Carregando salas...</p>
        ) : (
          <div className="salas-grid">
            {Array.isArray(salas) && salas.length > 0 ? (
              salas.map((sala) => (
                <CardSala
                  key={obterSalaId(sala)}
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
              ))
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