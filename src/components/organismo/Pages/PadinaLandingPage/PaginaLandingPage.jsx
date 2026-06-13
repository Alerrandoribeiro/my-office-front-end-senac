import PaginaInicial from "../PaginaInicial/PaginaInicial";
import { useNavigate } from "react-router-dom";
import "./PaginaLandinPage.css";

const PaginaLandingPage = () => {
  const navigate = useNavigate();

  const abrirCadastro = () => navigate('/cadastro-usuario');

  return (
    <PaginaInicial>
      <div className="landing-page">
        <section className="logos">
          <div className="container">
            <h2>Confiado por grandes empresas</h2>

            <div className="logos-grid">
              <img src="https://dummyimage.com/140x50/ffffff/000000&text=Google" alt="Google" />
              <img src="https://dummyimage.com/140x50/ffffff/000000&text=Amazon" alt="Amazon" />
              <img src="https://dummyimage.com/140x50/ffffff/000000&text=Nubank" alt="Nubank" />
              <img src="https://dummyimage.com/140x50/ffffff/000000&text=iFood" alt="iFood" />
              <img src="https://dummyimage.com/140x50/ffffff/000000&text=TOTVS" alt="TOTVS" />
            </div>
          </div>
        </section>

        <section className="benefits">
          <div className="container">
            <h2>Por que anunciar com a My Office?</h2>

            <div className="cards">
              <div className="card">
                <div className="icon">🏆</div>
                <h3>Divulgação Premium</h3>
                <p>
                  Anúncios segmentados que atingem o público certo em todo o
                  Brasil.
                </p>
              </div>

              <div className="card">
                <div className="icon">💰</div>
                <h3>Receita Extra Garantida</h3>
                <p>
                  Transforme seu espaço ocioso em uma fonte de renda mensal
                  consistente.
                </p>
              </div>

              <div className="card">
                <div className="icon">🔒</div>
                <h3>Segurança Total</h3>
                <p>
                  Suporte ativo, contratos digitais e pagamentos protegidos.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="steps">
          <div className="container">
            <h2>Como funciona?</h2>

            <div className="cards">
              <div className="card">
                <span className="step-number">1</span>
                <h3>Cadastre seu espaço</h3>
                <p>Descreva e carregue fotos profissionais do seu espaço.</p>
              </div>

              <div className="card">
                <span className="step-number">2</span>
                <h3>Alcance milhares de clientes</h3>
                <p>
                  Seja encontrado por empresas e profissionais qualificados.
                </p>
              </div>

              <div className="card">
                <span className="step-number">3</span>
                <h3>Gerencie reservas</h3>
                <p>
                  Contratos digitais e pagamentos protegidos, tudo fácil e
                  seguro.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <h2>O que nossos clientes dizem</h2>

            <div className="testimonial">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Cliente"
              />

              <p>
                "Consegui 4 reservas já no primeiro mês. A plataforma é fácil,
                rápida e segura!"
              </p>

              <h4>Marina Costa</h4>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <div className="container">
            <h2>Dúvidas Frequentes</h2>

            <details>
              <summary>Que tipos de espaços posso anunciar?</summary>
              <p>
                Aceitamos salas comerciais, escritórios, consultórios,
                coworkings e outros espaços corporativos.
              </p>
            </details>

            <details>
              <summary>Como funciona a segurança na plataforma?</summary>
              <p>
                Todos os contratos são digitais e os pagamentos são protegidos.
              </p>
            </details>

            <details>
              <summary>Tenho algum custo para anunciar?</summary>
              <p>
                O cadastro é gratuito. Você paga apenas após uma reserva ser
                concluída.
              </p>
            </details>
          </div>
        </section>
        <section className="cta">
          <div className="container">
            <h2>Está pronto para transformar seu espaço em lucro?</h2>

            <button className="cta-button" onClick={abrirCadastro}>
              Quero anunciar agora
            </button>
          </div>
        </section>
        
      </div>
    </PaginaInicial>
  );
};

export default PaginaLandingPage;