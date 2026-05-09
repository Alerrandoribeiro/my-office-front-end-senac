import Botao from './components/atomos/Botao/Botao'
import { FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import InputDate from './components/atomos/InputDate/InputDate';
import InputTexto from './components/atomos/InputTexto/InputTexto';
import Avatar from './components/atomos/Avatar/Avatar';
import InputComLabel from './components/moleculas/InputComLabel/InputComLabel';
import Pesquisar from './components/moleculas/Pesquisar/Pesquisar';
import MenuSalas from './components/moleculas/MenuSalas/MenuSalas';



function App() {
  return (
    <>
      <Botao cor={"erro"} texto={"Excluir"} largura="150px" altura="50px" icone={<MdDelete />} />
      <Botao cor={"secundaria"} texto={"Buscar"} largura="150px" altura="50px" icone={<FaSearch/>} />
      <Avatar imagem={"/favicon.svg"} nome="John Doe" />
      <InputTexto tipo='number' largura='300px' cor='primaria' placeholder='Digite seu nome' />
      <InputComLabel label='Nome' obrigatorio = {true} />
      <InputComLabel label='Idade' tipo={"number"} obrigatorio = {true} />
      <InputComLabel label='E-mail' tipo={"email"} obrigatorio = {true} />
      <InputDate desabilitado = {true} largura='300px' cor='primaria' />
      <Pesquisar placeholder='Pesquisar casas...' larguraInput='500px' larguraBotao='130px' corDoBotaoPesquisar ='secundaria' />
      <MenuSalas salas={[
    { id: 1, nome: "Sala Reunião" },
    { id: 2, nome: "Sala TI" },
    { id: 3, nome: "Sala RH" },
  ]}
  salaSelecionada={1}
  aoSelecionar={(sala) => console.log(sala)} />
    </>
  )
}

export default App
