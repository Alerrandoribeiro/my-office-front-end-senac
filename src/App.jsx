import Botao from './components/atomos/Botao/Botao'
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import InputDate from './components/atomos/InputDate/InputDate';
import InputTexto from './components/atomos/InputTexto/InputTexto';
import Avatar from './components/atomos/Avatar/Avatar';



function App() {
  return (
    <>
      <Botao cor={"erro"} texto={"Excluir"} largura="150px" altura="50px" icone={<MdDelete />} />
      <Botao cor={"secundaria"} texto={"Buscar"} largura="150px" altura="50px" icone={<FaSearch/>} />
      <Avatar imagem={"/favicon.svg"} nome="John Doe" />
      <InputTexto tipo='number' largura='300px' cor='primaria' placeholder='Digite seu nome' />
      <InputDate desabilitado = {true} largura='300px' cor='primaria' />
    </>
  )
}

export default App
