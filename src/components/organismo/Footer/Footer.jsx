import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-grid">

                    <div className="footer-column">
                        <h3>Empresa</h3>

                        <ul>
                            <li>
                                <a href="/">Sobre nós</a>
                            </li>

                            <li>
                                <a href="/">Carreiras</a>
                            </li>

                            <li>
                                <a href="/">Blog</a>
                            </li>

                            <li>
                                <a href="/">Parcerias</a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Novidades</h3>

                        <p>
                            Receba atualizações sobre nossos produtos e eventos.
                        </p>

                        <form className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Seu e-mail"
                            />

                            <button type="submit">
                                Enviar
                            </button>
                        </form>
                    </div>

                    <div className="footer-column">
                        <h3>Redes Sociais</h3>

                        <p>
                            Siga nossas redes sociais.
                        </p>

                        <div className="social-icons">
                            <a
                                href="https://wa.me/5541999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/whatsapp.png" alt="WhatsApp" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/linkedin.png" alt="LinkedIn" />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img src="/instagran.png" alt="Instagram" />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} MyOffice. Todos os direitos reservados.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;