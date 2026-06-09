import React, { useEffect, useState } from "react";
import "./PaginaReservas.css";
import TemplatePaginaPadrao from "../../TemplatePaginaPadrao/TemplatePaginaPadrao";
import AppBarLogado from "../../AppBarLogado/AppBarLogado";
import { obterUsuarioLogado } from "../../../utils/auth";
import {
  buscarReservasPorUsuario,
  deletarReserva,
  atualizarReserva,
} from "../../../../service/reservaService";
import { buscarTodasSalas } from "../../../../service/salaService";
import CardSala from "../../CardSala/CardSala";
import Modal from "../../../atomos/Modal/Modal";
import InputDate from "../../../atomos/InputDate/InputDate";
import Botao from "../../../atomos/Botao/Botao";
import { useToast } from "../../../../hooks/useToast";

const PaginaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [reservaEmEdicao, setReservaEmEdicao] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [dataEdicao, setDataEdicao] = useState("");
  const toast = useToast();

  const obterReservaId = (reserva) =>
    reserva?.id_reserva || reserva?.idReserva || reserva?.id;

  const obterSalaId = (sala) => sala?.id_sala || sala?.idSala || sala?.id;

  const buscarSalaById = (salaId) => {
    return salas.find((sala) => {
      const id = obterSalaId(sala);
      return Number(id) === Number(salaId);
    });
  };

  const carregarDados = async () => {
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

      const [todasSalas, reservasData] = await Promise.all([
        buscarTodasSalas(),
        buscarReservasPorUsuario(userId),
      ]);

      console.log("[PaginaReservas] Salas recebidas:", todasSalas);
      console.log("[PaginaReservas] Reservas recebidas:", reservasData);

      setSalas(Array.isArray(todasSalas) ? todasSalas : []);
      setReservas(Array.isArray(reservasData) ? reservasData : []);
    } catch (fetchError) {
      console.error(fetchError);
      setErro(fetchError.message || "Erro ao buscar dados");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const iniciarEdicao = (reserva) => {
    setReservaEmEdicao(reserva);
    setDataEdicao(reserva.data || "");
  };

  const cancelarEdicao = () => {
    setReservaEmEdicao(null);
    setDataEdicao("");
  };

  const handleExcluirReserva = async (id) => {
    if (!window.confirm("Deseja realmente excluir esta reserva?")) {
      return;
    }

    try {
      await deletarReserva(id);
      setReservas((prev) =>
        prev.filter((r) => obterReservaId(r) !== id)
      );
      toast.success("Reserva excluída com sucesso!");
    } catch (deleteError) {
      console.error(deleteError);
      const mensagem = deleteError.message || "Erro ao excluir reserva";
      toast.error(mensagem);
    }
  };

  const handleSalvarEdicao = async (event) => {
    event.preventDefault();

    if (!dataEdicao) {
      toast.warning("Por favor, selecione uma data");
      return;
    }

    if (!reservaEmEdicao) {
      return;
    }

    try {
      const reservaId = obterReservaId(reservaEmEdicao);
      const payload = {
        ...reservaEmEdicao,
        data: dataEdicao,
      };

      const reservaAtualizada = await atualizarReserva(reservaId, payload);
      setReservas((prev) =>
        prev.map((r) =>
          obterReservaId(r) === obterReservaId(reservaAtualizada)
            ? reservaAtualizada
            : r
        )
      );
      setReservaEmEdicao(null);
      setDataEdicao("");
      toast.success("Reserva atualizada com sucesso!");
    } catch (updateError) {
      console.error(updateError);
      const mensagem = updateError.message || "Erro ao atualizar reserva";
      toast.error(mensagem);
    }
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return "-";
    const date = new Date(dataISO + "T00:00:00");
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <TemplatePaginaPadrao appbar={<AppBarLogado />}>
      <div className="pagina-reservas_root">
        <h1>Minhas Reservas</h1>

        {erro && <p className="pagina-reservas_error">{erro}</p>}

        {reservaEmEdicao && (
          <Modal
            title="Editar Reserva"
            description="Altere a data da reserva e salve para aplicar."
            onClose={cancelarEdicao}
          >
            <form onSubmit={handleSalvarEdicao}>
              <div className="modal_form-row">
                <label>
                  Data da Reserva
                  <InputDate
                    valor={dataEdicao}
                    aoAlterar={(e) => setDataEdicao(e.target.value)}
                  />
                </label>
              </div>

              <div className="pagina-reservas_edit-actions">
                <button type="submit">Salvar alterações</button>
                <button
                  type="button"
                  onClick={cancelarEdicao}
                  className="secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Modal>
        )}

        {carregando ? (
          <p>Carregando reservas...</p>
        ) : (
          <div className="pagina-reservas_container">
            {Array.isArray(reservas) && reservas.length > 0 ? (
              <div className="pagina-reservas_grid">
                {reservas.map((reserva) => {
                  const reservaId = obterReservaId(reserva);
                  const salaId = reserva.salaId || reserva.sala_id;
                  const sala = buscarSalaById(salaId);

                  return (
                    <div key={reservaId} className="pagina-reservas_item">
                      <CardSala
                        salaId={obterSalaId(sala)}
                        tipoSala={sala?.tipoSala || sala?.tipo}
                        tipo={sala?.tipo}
                        nome={sala?.nome}
                        descricao={sala?.descricao}
                        capacidade={sala?.capacidade}
                        preco={sala?.preco}
                        rua={sala?.rua}
                        numero={sala?.numero}
                        bairro={sala?.bairro}
                        cidade={sala?.cidade}
                        estado={sala?.estado}
                        cep={sala?.cep}
                        imagem={sala?.imagem}
                        mostrarBotaoReserva={false}
                        actions={[
                          {
                            label: `Editar (${formatarData(reserva.data)})`,
                            variant: "secondary",
                            onClick: () => iniciarEdicao(reserva),
                          },
                          {
                            label: "Excluir Reserva",
                            variant: "danger",
                            onClick: () => handleExcluirReserva(reservaId),
                          },
                        ]}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="pagina-reservas_empty">
                Nenhuma reserva encontrada.
              </p>
            )}
          </div>
        )}
      </div>
    </TemplatePaginaPadrao>
  );
};

export default PaginaReservas;
