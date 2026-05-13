import { useState } from "react";
import "./FormularioDeCadastroDeSala.css";

import InputComLabel from "../../moleculas/InputComLabel/InputComLabel";
import Botao from "../../atomos/Botao/Botao";
import { MASCARA_CEP, formatarComMascara } from "../../utils/mascaras";

const FormularioDeCadastroDeSala = () => {
    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [numero, setNumero] = useState("");
    const [rua, setRua] = useState("");
    const [preco, setPreco] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [tipoSala, setTipoSala] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const limparCampos = () => {
        setCep("");
        setEstado("");
        setCidade("");
        setBairro("");
        setRua("");
        setNumero("");
        setPreco("");
        setCapacidade("");
        setTipoSala("");
        setDescricao("");
        setImagem("");
        setLatitude("");
        setLongitude("");
    };

    const erroDeObrigatoriedade = (campo) => {
        return !campo ? "Campo obrigatório!" : "";
    };

    const fazerCadastroSala = () => {
        console.log({
            cep,
            estado,
            cidade,
            bairro,
            rua,
            numero,
            preco,
            capacidade,
            tipoSala,
            descricao,
            imagem,
            latitude,
            longitude
        });

        alert("Cadastro realizado com sucesso!");
        limparCampos();
    };

    const botaoDesabilitado =
        !cep ||
        !estado ||
        !cidade ||
        !bairro ||
        !rua ||
        !numero ||
        !preco ||
        !capacidade ||
        !tipoSala ||
        !descricao ||
        !imagem ||
        !latitude ||
        !longitude;

    return (
        <div className="formulario-cadastro-sala_root">
            <h1 className="formulario-cadastro-sala_titulo">
                Cadastro de Sala
            </h1>

            <div className="formulario-cadastro-sala_campos">

                <InputComLabel
                    label="CEP"
                    placeholder="Informe o CEP"
                    valor={cep}
                    aoAlterar={(e) => setCep(formatarComMascara(e.target.value, MASCARA_CEP))}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(cep)}
                />

                <InputComLabel
                    label="Estado"
                    placeholder="Informe o estado"
                    valor={estado}
                    aoAlterar={(e) => setEstado(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(estado)}
                />

                <InputComLabel
                    label="Cidade"
                    placeholder="Informe a cidade"
                    valor={cidade}
                    aoAlterar={(e) => setCidade(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(cidade)}
                />

                <InputComLabel
                    label="Bairro"
                    placeholder="Informe o bairro"
                    valor={bairro}
                    aoAlterar={(e) => setBairro(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(bairro)}
                />

                <InputComLabel
                    label="Rua"
                    placeholder="Informe a rua"
                    valor={rua}
                    aoAlterar={(e) => setRua(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(rua)}
                />

                <InputComLabel
                    label="Número"
                    placeholder="Informe o número"
                    valor={numero}
                    aoAlterar={(e) => setNumero(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(numero)}
                />

                <InputComLabel
                    label="Preço"
                    placeholder="Informe o preço"
                    valor={preco}
                    aoAlterar={(e) => setPreco(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(preco)}
                />

                <InputComLabel
                    label="Capacidade"
                    placeholder="Informe a capacidade"
                    valor={capacidade}
                    aoAlterar={(e) => setCapacidade(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(capacidade)}
                />

                <InputComLabel
                    label="Tipo da Sala"
                    placeholder="Informe o tipo"
                    valor={tipoSala}
                    aoAlterar={(e) => setTipoSala(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(tipoSala)}
                />

                <InputComLabel
                    label="Descrição"
                    placeholder="Informe a descrição"
                    valor={descricao}
                    aoAlterar={(e) => setDescricao(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(descricao)}
                />

                <InputComLabel
                    label="Imagem (URL)"
                    placeholder="Informe a URL da imagem"
                    valor={imagem}
                    aoAlterar={(e) => setImagem(e.target.value)}
                    largura="100%"
                    mensagemErro={erroDeObrigatoriedade(imagem)}
                />
            </div>

            <div className="formulario-cadastro-sala_botao">
                <Botao
                    texto="Cadastrar Sala"
                    cor="primaria"
                    largura="100%"
                    altura="50px"
                    aoClicar={fazerCadastroSala}
                    desabilitado={botaoDesabilitado}
                />
            </div>
        </div>
    );
};

export default FormularioDeCadastroDeSala;