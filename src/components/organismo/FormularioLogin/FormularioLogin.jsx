import { useState } from "react";

import { MdLogin } from "react-icons/md";

import "./FormularioLogin.css";
import InputComLabel from "../../moleculas/InputComLabel/InputComLabel";
import Botao from "../../atomos/Botao/Botao";

const FormularioLogin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const fazerLogin = () => {
    // Vou adicionar a lógica para autenticar o usuário aqui, mas por enquanto só vou mostrar os dados no console
    console.log({
      email,
      senha,
    });
  };

  return (
    <div className="formulario-login_root">
      <h1 className="formulario-login_titulo">Login</h1>

      <div className="formulario-login_campos">
        <InputComLabel
          label="Email"
          placeholder="Digite seu email"
          valor={email}
          aoAlterar={(e) => setEmail(e.target.value)}
          largura="100%"
        />

        <InputComLabel
          label="Senha"
          tipo="password"
          placeholder="Digite sua senha"
          valor={senha}
          aoAlterar={(e) => setSenha(e.target.value)}
          largura="100%"
        />
      </div>

      <Botao
        texto="Entrar"
        cor="primaria"
        largura="100%"
        altura="50px"
        aoClicar={fazerLogin}
        icone={<MdLogin />}
      />
      <p className="formulario-login_cadastro">
        Não tem uma conta?
        <span> Cadastre-se</span>
      </p>
    </div>
  );
};

export default FormularioLogin;
