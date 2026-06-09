import React, { useState } from "react";
import Modal from "../../atomos/Modal/Modal";
import InputDate from "../../atomos/InputDate/InputDate";
import Botao from "../../atomos/Botao/Botao";
import { criarReserva } from "../../../service/reservaService";
import { obterUsuarioLogado } from "../../utils/auth";
import { useToast } from "../../../hooks/useToast";
import "./ModalReservaSala.css";

const ModalReservaSala = ({ salaId, onClose, onSuccess }) => {
  const [data, setData] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const toast = useToast();

  const handleReservar = async () => {
    if (!data) {
      setErro("Por favor, selecione uma data");
      toast.warning("Por favor, selecione uma data");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const usuarioLogado = obterUsuarioLogado();
      console.log("[ModalReservaSala] Usuario logado:", usuarioLogado);
      
      const usuarioId = usuarioLogado?.idUsuario || usuarioLogado?.id || usuarioLogado?.usuarioId;
      
      console.log("[ModalReservaSala] usuarioId extraído:", usuarioId);
      console.log("[ModalReservaSala] salaId recebido:", salaId);
      console.log("[ModalReservaSala] data selecionada:", data);

      if (!usuarioId) {
        const msg = "Usuário não autenticado. Faça login novamente.";
        setErro(msg);
        toast.error(msg);
        setCarregando(false);
        return;
      }

      if (!salaId) {
        const msg = "Erro: ID da sala não fornecido";
        setErro(msg);
        toast.error(msg);
        setCarregando(false);
        return;
      }

      const reserva = {
        usuarioId: parseInt(usuarioId),
        salaId: parseInt(salaId),
        data: data,
      };

      console.log("[ModalReservaSala] Enviando para o serviço:", reserva);

      await criarReserva(reserva);
      
      console.log("[ModalReservaSala] Reserva criada com sucesso!");
      toast.success("Reserva criada com sucesso!");
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    } catch (erro) {
      console.error("[ModalReservaSala] Erro ao criar reserva:", erro);
      const mensagem = erro.message || "Erro ao criar reserva. Tente novamente.";
      setErro(mensagem);
      toast.error(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Modal
      title="Reservar Sala"
      description="Selecione a data que deseja reservar esta sala"
      onClose={onClose}
    >
      <div className="modal-reserva-sala_content">
        <div className="modal-reserva-sala_form">
          <label className="modal-reserva-sala_label">
            Data da Reserva
          </label>
          <InputDate
            valor={data}
            aoAlterar={(event) => {
              setData(event.target.value);
              setErro("");
            }}
            cor={erro ? "erro" : "primaria"}
            largura="100%"
            altura="50px"
          />
          {erro && <span className="modal-reserva-sala_erro">{erro}</span>}
        </div>

        <div className="modal-reserva-sala_actions">
          <Botao
            cor="primaria"
            tamanho="grande"
            desabilitado={carregando}
            aoClicar={handleReservar}
          >
            {carregando ? "Reservando..." : "Reservar"}
          </Botao>
          <Botao
            cor="secundaria"
            tamanho="grande"
            desabilitado={carregando}
            aoClicar={onClose}
          >
            Cancelar
          </Botao>
        </div>
      </div>
    </Modal>
  );
};

export default ModalReservaSala;
