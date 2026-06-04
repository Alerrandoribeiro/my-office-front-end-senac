import React from "react";
import "./Modal.css";

const Modal = ({ title, description, onClose, children }) => {
  return (
    <div className="modal_overlay" onClick={onClose}>
      <section className="modal_container" onClick={(event) => event.stopPropagation()}>
        <div className="modal_header">
          <div className="modal_header-text">
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </div>
          <button
            type="button"
            className="modal_close"
            aria-label="Fechar modal"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal_body">{children}</div>
      </section>
    </div>
  );
};

export default Modal;
