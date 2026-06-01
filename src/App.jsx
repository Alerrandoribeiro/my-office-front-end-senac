import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PaginaInicial from "./components/organismo/Pages/PaginaInicial/PaginaInicial";
import PaginaCadastroSala from "./components/organismo/Pages/PaginaCadastroSala/PaginaCadastroSala";
import PaginaLogin from "./components/organismo/Pages/PaginaLogin/PaginaLogin";
import PaginaCadastroUsuario from "./components/organismo/Pages/PaginaCadastroUsuario/PaginaCadastroUsuario";
import PaginaTodasAsSalas from "./components/organismo/Pages/PaginaTodasAsSalas/PaginaTodasAsSalas";

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
    path: "*",
    element: <h1>404 - Página não encontrada</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;