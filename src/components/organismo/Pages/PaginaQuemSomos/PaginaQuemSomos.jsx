import React from "react";
import { FaLightbulb, FaCheckCircle, FaSyncAlt } from "react-icons/fa";
import "./PaginaQuemSomos.css";
import PaginaInicial from "../PaginaInicial/PaginaInicial";

const PaginaQuemSomos = () => {
  return (
    <PaginaInicial>
    <main className="container">
      <p className="text">
        A My Office nasceu para transformar a forma como empresas,
        empreendedores e profissionais encontram e reservam espaços
        corporativos. Nossa plataforma conecta pessoas a ambientes modernos,
        funcionais e preparados para reuniões, treinamentos, eventos e diversas
        atividades profissionais, oferecendo uma experiência prática, segura e
        eficiente do início ao fim.
      </p>

      <hr className="divider" />

      <section className="section">
        <h2 className="title">MISSÃO</h2>
        <p className="text">
          Proporcionar soluções inteligentes para a gestão e reserva de espaços
          corporativos, oferecendo praticidade, flexibilidade e excelência em
          cada experiência. Nosso compromisso é apoiar o crescimento dos nossos
          clientes por meio de ambientes que incentivem a produtividade, a
          colaboração e a inovação.
        </p>
      </section>

      <section className="section">
        <h2 className="title">VISÃO</h2>
        <p className="text">
          Ser referência em soluções de espaços corporativos, reconhecida pela
          inovação tecnológica, pela qualidade dos serviços prestados e pela
          capacidade de conectar pessoas e negócios aos ambientes ideais para
          alcançar seus objetivos.
        </p>
      </section>

      <section className="section">
        <h2 className="title">VALORES</h2>

        <div className="valuesGrid">
          <div className="card">
            <div className="icon">
              <FaLightbulb size={24} />
            </div>

            <div>
              <h3 className="cardTitle">Inovação</h3>
              <p className="cardText">
                Investimos continuamente em tecnologia e novas soluções para
                oferecer uma experiência moderna, intuitiva e eficiente aos
                nossos clientes.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon">
              <FaCheckCircle size={24} />
            </div>

            <div>
              <h3 className="cardTitle">Excelência</h3>
              <p className="cardText">
                Atuamos com foco na qualidade, buscando superar expectativas e
                entregar resultados que gerem valor para clientes, parceiros e
                colaboradores.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon">
              <FaSyncAlt size={24} />
            </div>

            <div>
              <h3 className="cardTitle">Flexibilidade</h3>
              <p className="cardText">
                Entendemos que cada negócio possui necessidades específicas.
                Por isso, oferecemos soluções adaptáveis que acompanham a
                evolução e os desafios de cada cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="title">EQUIPE</h2>
        <p className="text">
          Nossa equipe é formada por profissionais qualificados e comprometidos
          com a excelência. Trabalhamos diariamente para desenvolver soluções
          inovadoras e garantir uma plataforma confiável, segura e fácil de
          utilizar.
        </p>
      </section>

      <section className="section">
        <h2 className="title">POR QUE ESCOLHER A MY OFFICE?</h2>
        <p className="text">
          Porque acreditamos que encontrar o espaço ideal deve ser simples e
          eficiente. Com a My Office, você tem acesso a uma plataforma moderna,
          segura e intuitiva, que conecta sua empresa aos melhores ambientes
          corporativos para reuniões, eventos e atividades profissionais.
          Oferecemos mais do que reservas: entregamos praticidade,
          produtividade e oportunidades para impulsionar o crescimento do seu
          negócio.
        </p>
      </section>
    </main>
    </PaginaInicial>
  );
};

export default PaginaQuemSomos;