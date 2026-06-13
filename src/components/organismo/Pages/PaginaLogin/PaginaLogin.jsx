import React from 'react'
import FormularioLogin from '../../FormularioLogin/FormularioLogin'
import PaginaInicial from '../PaginaInicial/PaginaInicial'
import Modal from '../../..//atomos/Modal/Modal'
import { useNavigate } from 'react-router-dom'

const PaginaLogin = () => {
  const navigate = useNavigate();
  return (
    <PaginaInicial>
      <Modal title="Login" description="Faça login para acessar suas salas" onClose={() => navigate('/') }>
        <FormularioLogin />
      </Modal>
    </PaginaInicial>
  );
}

export default PaginaLogin
