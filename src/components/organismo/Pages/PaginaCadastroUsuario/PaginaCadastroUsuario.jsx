import React from 'react'
import PaginaInicial from '../PaginaInicial/PaginaInicial'
import FormularioDeCadastroUsuario from '../../FormularioDeCadastroUsuario/FormularioDeCadastroUsuario'
import Modal from '../../..//atomos/Modal/Modal'
import { useNavigate } from 'react-router-dom'

const PaginaCadastroUsuario = () => {
  const navigate = useNavigate();
  return (
    <PaginaInicial>
      <Modal title="Cadastro" description="Crie sua conta" onClose={() => navigate('/') }>
        <FormularioDeCadastroUsuario />
      </Modal>
    </PaginaInicial>
  );
}

export default PaginaCadastroUsuario
