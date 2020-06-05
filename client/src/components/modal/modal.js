import React, {Component} from 'react';
import "./modal.css";
import Graph from '../graph/graph';

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
          <button onClick={this.closeModal}>🞬</button>
          <h1>Modal</h1>
        </div>
    </div>
    );
  }
}

export default Modal;