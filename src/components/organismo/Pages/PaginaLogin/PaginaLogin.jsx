import React from 'react'
import FormularioLogin from '../../FormularioLogin/FormularioLogin'
import PaginaInicial from '../PaginaInicial/PaginaInicial'
import ScrollToTop from '../../../atomos/ScrollTop/ScrollTop';

const PaginaLogin = () => {
  return (
    <PaginaInicial>
      <ScrollToTop>
      <FormularioLogin />
      </ScrollToTop>
    </PaginaInicial>
  );
}

export default PaginaLogin
