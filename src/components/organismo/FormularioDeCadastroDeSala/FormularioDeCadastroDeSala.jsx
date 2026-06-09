import { useEffect, useState } from "react";

import "./FormularioDeCadastroDeSala.css";

import InputComLabel from "../../moleculas/InputComLabel/InputComLabel";
import Botao from "../../atomos/Botao/Botao";
import CardSala from "../CardSala/CardSala";
import { buscarEnderecoPorCep } from "../../../service/cepService";
import { cadastrarSala } from "../../../service/salaService";
import { obterUsuarioLogado } from "../../utils/auth";
import { useToast } from "../../../hooks/useToast";

import {
    MASCARA_CEP,
    formatarComMascara
} from "../../utils/mascaras";

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
    const [imagemArquivo, setImagemArquivo] = useState(null);
    const [imagemPreview, setImagemPreview] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const toast = useToast();

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
        setImagemArquivo(null);
        setImagemPreview("");
        setLatitude("");
        setLongitude("");
    };

    const erroDeObrigatoriedade = (campo) => {
        return !campo ? "Campo obrigatório!" : "";
    };

    const buscarCep = async (valorCep) => {
        const cepSemMascara = valorCep.replace(/\D/g, "");

        if (cepSemMascara.length !== 8) return;

        try {
            const resp = await buscarEnderecoPorCep(cepSemMascara);

            setRua(resp.street || "");
            setBairro(resp.neighborhood || "");
            setCidade(resp.city || "");
            setEstado(resp.state || "");
            setLatitude(resp.location?.coordinates?.latitude || "");
            setLongitude(resp.location?.coordinates?.longitude || "");

            toast.success("Endereço encontrado!");
        } catch (error) {
            toast.error("CEP não encontrado.");
            console.error(error);
        }
    };

    useEffect(() => {
        if (!imagemArquivo) {
            setImagemPreview("");
            return;
        }

        const objectUrl = URL.createObjectURL(imagemArquivo);
        setImagemPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imagemArquivo]);

    const carregarImagemComoBase64 = (arquivo) => {
        return new Promise((resolve, reject) => {
            if (!arquivo) {
                resolve(null);
                return;
            }

            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(arquivo);
        });
    };

    const fazerCadastroSala = async () => {
        try {
            const usuarioLogado = obterUsuarioLogado();

            if (!usuarioLogado || !usuarioLogado.id) {
                toast.error("Usuário não autenticado!");
                return;
            }

            const imagemBase64 = await carregarImagemComoBase64(imagemArquivo);
            const salaPayload = {
                cep,
                estado,
                cidade,
                bairro,
                rua,
                numero,
                preco,
                capacidade,
                tipo_sala: tipoSala,
                descricao,
                imagem: imagemBase64,
                latitude,
                longitude,
                usuarioId: usuarioLogado.id,
            };

            await cadastrarSala(salaPayload);
            toast.success("Cadastro realizado com sucesso!");
            limparCampos();
        } catch (error) {
            toast.error("Erro ao cadastrar sala.");
            console.error(error);
        }
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
        !imagemArquivo;

    return (
        <div className="formulario-cadastro-sala_root">
            <div className="formulario-cadastro-sala_header">
                <div>
                    <p className="formulario-cadastro-sala_badge">Novo Espaço</p>
                    <h1 className="formulario-cadastro-sala_titulo">
                        Cadastro de Sala
                    </h1>
                    <p className="formulario-cadastro-sala_subtitulo">
                        Preencha os detalhes da sala e veja a prévia em tempo real.
                    </p>
                </div>
            </div>

            <div className="formulario-cadastro-sala_grid">
                <section className="formulario-cadastro-sala_formulario">
                    <div className="formulario-cadastro-sala_campos">
                        <InputComLabel
                            label="CEP"
                            placeholder="Informe o CEP"
                            valor={cep}
                            aoAlterar={(e) => {
                                const valorFormatado = formatarComMascara(
                                    e.target.value,
                                    MASCARA_CEP
                                );

                                setCep(valorFormatado);
                                buscarCep(valorFormatado);
                            }}
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

                        <div className="formulario-cadastro-sala_upload">
                            <div className="upload-label-row">
                                <span className="upload-label">Upload da imagem</span>
                                <span className="upload-note">Aceitamos JPG, PNG ou WebP</span>
                            </div>

                            <label htmlFor="imagemUpload" className="upload-input-box">
                                <input
                                    id="imagemUpload"
                                    type="file"
                                    accept="image/*"
                                    className="upload-input"
                                    onChange={(e) => {
                                        const arquivo = e.target.files?.[0];
                                        if (!arquivo) return;

                                        setImagemArquivo(arquivo);
                                    }}
                                />

                                <div className="upload-button">Escolher arquivo</div>
                                <div className="upload-filename">
                                    {imagemArquivo ? imagemArquivo.name : "Nenhum arquivo selecionado"}
                                </div>
                            </label>

                            {!imagemArquivo && (
                                <span className="upload-error">Campo obrigatório!</span>
                            )}
                        </div>
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
                </section>

                <CardSala
                    tipoSala={tipoSala}
                    descricao={descricao}
                    capacidade={capacidade}
                    preco={preco}
                    rua={rua}
                    numero={numero}
                    bairro={bairro}
                    cidade={cidade}
                    estado={estado}
                    cep={cep}
                    imagem={imagemPreview}
                />
            </div>
        </div>
    );
};

export default FormularioDeCadastroDeSala;
