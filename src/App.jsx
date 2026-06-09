import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PaginaInicial from "./components/organismo/Pages/PaginaInicial/PaginaInicial";
import PaginaCadastroSala from "./components/organismo/Pages/PaginaCadastroSala/PaginaCadastroSala";
import PaginaLogin from "./components/organismo/Pages/PaginaLogin/PaginaLogin";
import PaginaCadastroUsuario from "./components/organismo/Pages/PaginaCadastroUsuario/PaginaCadastroUsuario";
import PaginaMeuCadastro from "./components/organismo/Pages/PaginaMeuCadastro/PaginaMeuCadastro";
import PaginaTodasAsSalas from "./components/organismo/Pages/PaginaTodasAsSalas/PaginaTodasAsSalas";
import PaginaMinhasSalas from "./components/organismo/Pages/PaginaMinhasSalas/PaginaMinhasSalas";
import PaginaReservas from "./components/organismo/Pages/PaginaReservas/PaginaReservas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PaginaInicial />,
  },
  {
    path: "/cadastro-sala",
    element: <PaginaCadastroSala/>,
  } ,
  {
    path: "/login",
    element: <PaginaLogin/>,
  } ,
  {
    path: "/todas-salas",
    element: <PaginaTodasAsSalas/>,
  } ,
  {
    path: "/cadastro-usuario",
    element: <PaginaCadastroUsuario/>,
  } ,
  {
    path: "/meu-cadastro",
    element: <PaginaMeuCadastro/>,
  } ,
  {
    path: "/usuario-logado",
    element: <PaginaMinhasSalas/>,
  } ,
  {
    path: "/minhas-salas",
    element: <PaginaMinhasSalas/>,
  } ,
  {
    path: "/reservas",
    element: <PaginaReservas/>,
  } ,
  {
    path: "*",
    element: <h1>404 - Página não encontrada</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;