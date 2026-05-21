import React from 'react'
import Footer from '../Footer/Footer';
import AppBar from '../AppBar/AppBar';

const TemplatePaginaPadrao = ({children}) => {
    return (
        <div>
          <AppBar/>
    
          <main
            style={{
              padding: "20px",
              maxWidth: "800px",
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