import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onToggle();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onToggle();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClick}>
        <div className={s.Modal}>
          <img
            className={s.Img}
            src="https://pixabay.com/get/g0532039dd0bc57e844cd74c4e4df0078302efc5bc691a542872369b1bb0ee73b36e9c664c052a00a453e37414975420178a1a335180f8eb4454e3b823b387167_1280.jpg"
            alt=""
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
