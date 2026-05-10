import { useState } from "react";
import { MdPersonAdd } from "react-icons/md";
import "./FormularioDeCadastroUsuario.css";

import InputComLabel from "../../moleculas/InputComLabel/InputComLabel";
import Botao from "../../atomos/Botao/Botao";

import { formatarComMascara, MASCARA_TELEFONE } from "../../utils/mascaras";
import {
  emailValido,
  senhaForte,
  telefoneValido,
  senhasIguais,
} from "../../utils/validarFormulario";

const FormularioDeCadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const erroNome = () => {
    if (!nome) return "Campo obrigatório!";
    return "";
  };

  const erroTelefone = () => {
    if (!telefone) return "Campo obrigatório!";
    if (!telefoneValido(telefone)) return "Telefone inválido!";
    return "";
  };

  const erroEmail = () => {
    if (!email) return "Campo obrigatório!";
    if (!emailValido(email)) return "Email inválido!";
    return "";
  };

  const erroSenha = () => {
    if (!senha) return "Campo obrigatório";
    if (!senhaForte(senha)) return "A senha deve ter no mínimo 8 caracteres.";
    return "";
  };

  const erroConfirmarSenha = () => {
    if (!confirmarSenha) return "Campo obrigatório!";
    if (!senhasIguais(senha, confirmarSenha)) return "As senhas não coincidem.";
    return "";
  };

  const fazerCadastro = () => {
   
    console.log({
      nome,
      telefone,
      email,
      senha,
      confirmarSenha,
    });

    alert("Cadastro realizado com sucesso!");
  };

  const botaoDesabilitado =
    !nome ||
    !telefone ||
    !email ||
    !senha ||
    !confirmarSenha ||
    !emailValido(email) ||
    !senhaForte(senha) ||
    !senhasIguais(senha, confirmarSenha) ||
    !telefoneValido(telefone);

  return (
    <div className="formulario-cadastro_root">
      <h1 className="formulario-cadastro_titulo">Cadastro</h1>

      <div className="formulario-cadastro_campos">
        <InputComLabel
          label="Nome"
          placeholder="Digite seu nome"
          valor={nome}
          aoAlterar={(e) => setNome(e.target.value)}
          largura="100%"
          mensagemErro={erroNome()}
        />

        <InputComLabel
          label="Telefone"
          tipo="tel"
          placeholder="Digite seu telefone"
          valor={telefone}
          aoAlterar={(e) =>
            setTelefone(formatarComMascara(e.target.value, MASCARA_TELEFONE))
          }
          largura="100%"
          mensagemErro={erroTelefone()}
        />

        <InputComLabel
          label="Email"
          tipo="email"
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

        <InputComLabel
          label="Confirmar senha"
          tipo="password"
          placeholder="Confirme sua senha"
          valor={confirmarSenha}
          aoAlterar={(e) => setConfirmarSenha(e.target.value)}
          largura="100%"
          mensagemErro={erroConfirmarSenha()}
        />
      </div>

      <Botao
        texto="Cadastrar"
        cor="primaria"
        largura="100%"
        altura="50px"
        aoClicar={fazerCadastro}
        icone={<MdPersonAdd />}
        desabilitado={botaoDesabilitado}
      />

      <p className="formulario-cadastro_login">
        Já possui uma conta?
        <span> Entrar</span>
      </p>
    </div>
  );
};

export default FormularioDeCadastroUsuario;