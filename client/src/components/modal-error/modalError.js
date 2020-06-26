import React, {Component} from 'react';
import './modalError.css';

class ModalError extends Component {
  
  constructor(props) {
    super(props);
  }

  submit = (event) => {
    this.props.onClose();
  }

  render() {

    return (
    <div className="addDataContent">
        <h2>{this.props.title}</h2>
        <p>{this.props.children}</p>
        <button type="submit" onClick={this.submit}>OK</button>
    </div>
    );
  }
}

export default ModalError;