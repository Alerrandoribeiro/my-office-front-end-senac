import { useState } from "react";

import { MdPersonAdd } from "react-icons/md";

import "./FormularioDeCadastroUsuario.css";
import InputComLabel from "../../moleculas/InputComLabel/InputComLabel";
import Botao from "../../atomos/Botao/Botao";



const FormularioDeCadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const fazerCadastro = () => {
    console.log({
      nome,
      telefone,
      email,
      senha,
      confirmarSenha,
    });
  };

  return (
    <div className="formulario-cadastro_root">
      <h1 className="formulario-cadastro_titulo">
        Cadastro
      </h1>

      <div className="formulario-cadastro_campos">
        <InputComLabel
          label="Nome"
          placeholder="Digite seu nome"
          valor={nome}
          aoAlterar={(e) =>
            setNome(e.target.value)
          }
          largura="100%"
        />

        <InputComLabel
          label="Telefone"
          tipo="tel"
          placeholder="Digite seu telefone"
          valor={telefone}
          aoAlterar={(e) =>
            setTelefone(e.target.value)
          }
          largura="100%"
        />

        <InputComLabel
          label="Email"
          tipo="email"
          placeholder="Digite seu email"
          valor={email}
          aoAlterar={(e) =>
            setEmail(e.target.value)
          }
          largura="100%"
        />

        <InputComLabel
          label="Senha"
          tipo="password"
          placeholder="Digite sua senha"
          valor={senha}
          aoAlterar={(e) =>
            setSenha(e.target.value)
          }
          largura="100%"
        />

        <InputComLabel
          label="Confirmar senha"
          tipo="password"
          placeholder="Confirme sua senha"
          valor={confirmarSenha}
          aoAlterar={(e) =>
            setConfirmarSenha(e.target.value)
          }
          largura="100%"
        />
      </div>

      <Botao
        texto="Cadastrar"
        cor="primaria"
        largura="100%"
        altura="50px"
        aoClicar={fazerCadastro}
        icone={<MdPersonAdd />}
      />

      <p className="formulario-cadastro_login">
        Já possui uma conta?
        <span> Entrar</span>
      </p>
    </div>
  );
};

export default FormularioDeCadastroUsuario;;