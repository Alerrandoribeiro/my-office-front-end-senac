import React from 'react';
import TemplatePaginaPadrao from '../../TemplatePaginaPadrao/TemplatePaginaPadrao';
import FormularioDeCadastroDeSala from '../../FormularioDeCadastroDeSala/FormularioDeCadastroDeSala';
import ScrollToTop from '../../../atomos/ScrollTop/ScrollTop';

const PaginaCadastroSala = () => {
  return (
    <TemplatePaginaPadrao>
      <ScrollToTop>
      <FormularioDeCadastroDeSala />
      </ScrollToTop>
    </TemplatePaginaPadrao>
  );
};

export default PaginaCadastroSala;
