import { useState } from "react";

import { MdLogin } from "react-icons/md";

import "./FormularioLogin.css";
import InputComLabel from "../../moleculas/InputComLabel/InputComLabel";
import Botao from "../../atomos/Botao/Botao";

import {
  campoVazio,
  emailValido,
  senhaForte,
} from "../../utils/validarFormulario";

const FormularioLogin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const erroEmail = () => {
    if (campoVazio(email)) {
      return "Campo obrigatório";
    }

    if (!emailValido(email)) {
      return "Email inválido!";
    }

    return "";
  };

  const erroSenha = () => {
    if (campoVazio(senha)) {
      return "Campo obrigatório!";
    }
    if (!senhaForte(senha)) {
      return "A senha deve ter no mínimo 8 caracteres.";
    }
    return "";
  };

  const fazerLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação, como enviar os dados para um servidor
    console.log({
      email,
      senha,
    });

    alert("Login realizado com sucesso!");
  };

  const botaoDesabilitado =
    campoVazio(email) ||
    campoVazio(senha) ||
    !senhaForte(senha) ||
    !emailValido(email);

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
          mensagemErro={erroEmail()}
        />

        <InputComLabel
          label="Senha"
          tipo="password"
          placeholder="Digite sua senha"
          valor={senha}
          aoAlterar={(e) => setSenha(e.target.value)}
          largura="100%"
          mensagemErro={erroSenha()}
        />
      </div>

      <Botao
        texto="Entrar"
        cor="primaria"
        largura="100%"
        altura="50px"
        aoClicar={fazerLogin}
        icone={<MdLogin />}
        desabilitado={botaoDesabilitado}
      />

      <p className="formulario-login_cadastro">
        Não tem uma conta?
        <span> Cadastre-se</span>
      </p>
    </div>
  );
};

export default FormularioLogin;
