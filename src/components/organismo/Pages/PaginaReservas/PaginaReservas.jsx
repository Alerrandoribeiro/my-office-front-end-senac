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
import Modal from "../../../atomos/Modal/Modal";
import InputDate from "../../../atomos/InputDate/InputDate";
import Botao from "../../../atomos/Botao/Botao";

const PaginaReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [reservaEmEdicao, setReservaEmEdicao] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [dataEdicao, setDataEdicao] = useState("");

  const obterReservaId = (reserva) =>
    reserva?.id_reserva || reserva?.idReserva || reserva?.id;

  const carregarReservas = async () => {
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

      const data = await buscarReservasPorUsuario(userId);
      console.log("[PaginaReservas] Reservas recebidas:", data);
      setReservas(Array.isArray(data) ? data : []);
    } catch (fetchError) {
      console.error(fetchError);
      setErro(fetchError.message || "Erro ao buscar reservas");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarReservas();
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
      alert("Reserva excluída com sucesso!");
    } catch (deleteError) {
      console.error(deleteError);
      alert(deleteError.message || "Erro ao excluir reserva");
    }
  };

  const handleSalvarEdicao = async (event) => {
    event.preventDefault();

    if (!dataEdicao) {
      alert("Por favor, selecione uma data");
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
      alert("Reserva atualizada com sucesso!");
    } catch (updateError) {
      console.error(updateError);
      alert(updateError.message || "Erro ao atualizar reserva");
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
              <table className="pagina-reservas_table">
                <thead>
                  <tr>
                    <th>Sala ID</th>
                    <th>Data da Reserva</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map((reserva) => {
                    const reservaId = obterReservaId(reserva);
                    return (
                      <tr key={reservaId}>
                        <td>
                          {reserva.salaId ||
                            reserva.sala_id ||
                            reserva.sala?.id ||
                            "-"}
                        </td>
                        <td>{formatarData(reserva.data)}</td>
                        <td className="pagina-reservas_actions">
                          <button
                            className="btn-editar"
                            onClick={() => iniciarEdicao(reserva)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn-excluir"
                            onClick={() => handleExcluirReserva(reservaId)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
