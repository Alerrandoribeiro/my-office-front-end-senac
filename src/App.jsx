
import './App.css'
import Botao from './components/atomos/Botao/Botao'
import Icone from './components/atomos/Icone/Icone'
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  return (
    <>
      <Botao cor={"erro"} texto={"Excluir"} largura="150px" altura="50px" icone={<MdDelete />} />
      <Botao cor={"secundaria"} texto={"Buscar"} largura="150px" altura="50px" icone={<FaSearch/>} />
    </>
  )
}

export default App
