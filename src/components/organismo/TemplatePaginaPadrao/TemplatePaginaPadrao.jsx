import React from 'react'
import Footer from '../Footer/Footer';
import AppBarLogado from '../AppBarLogado/AppBarLogado';
import { estaLogado } from '../../utils/auth';

const TemplatePaginaPadrao = ({children, appbar}) => {
    return (
        <div>
          {estaLogado() ? <AppBarLogado /> : appbar}

          <main
            style={{
              padding: "20px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {children}
          </main>

          <Footer />
        </div>
      );
}

export default TemplatePaginaPadrao