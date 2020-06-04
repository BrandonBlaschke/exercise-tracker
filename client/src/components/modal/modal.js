import React, {Component} from 'react';
import "./modal.css";

class Modal extends Component {

  closeModal = () => {
      this.props.show = false;
      this.props.onClose();
  }

  render() {

    if (!this.props.show) {
        return null;
    }

    return (
    <div className="modal">
        <div className="modal-main">
            <h1>Modal</h1>
            <p>{this.props.data.name}</p>
            <button onClick={this.closeModal}>Close</button>
        </div>
    </div>
    );
  }
}

export default Modal;