import React from 'react'
import Footer from '../Footer/Footer';

const TemplatePaginaPadrao = ({children, appbar}) => {
    return (
        <div>
          {appbar}
    
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