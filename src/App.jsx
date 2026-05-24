
import AppBar from './components/organismo/AppBar/AppBar';
import CardSala from './components/organismo/CardSala/CardSala';
import Footer from './components/organismo/Footer/Footer';
import FormularioDeCadastroDeSala from './components/organismo/FormularioDeCadastroDeSala/FormularioDeCadastroDeSala';
import FormularioDeCadastroUsuario from './components/organismo/FormularioDeCadastroUsuario/FormularioDeCadastroUsuario';
import FormularioLogin from './components/organismo/FormularioLogin/FormularioLogin';
import TemplatePaginaPadrao from './components/organismo/TemplatePaginaPadrao/TemplatePaginaPadrao';



function App() {
  return (
    <>
      <TemplatePaginaPadrao>
       <FormularioDeCadastroDeSala />
      </TemplatePaginaPadrao>
    </>
  )
}

export default App
