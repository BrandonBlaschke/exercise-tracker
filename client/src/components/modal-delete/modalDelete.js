import React, {Component} from 'react';
import axios from 'axios';
import ModalError from '../modal-error/modalError';

class ModalDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalError: false
    }
  }

  submit = (event) => {
    event.preventDefault();

    let token = document.cookie.split(';')[0].split('=')[1]
    axios.delete(`/exercise/${this.props.id}`, {
        headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
            // Remove from client list
            this.props.delete(this.props.id);
            this.props.close();
        })
        .catch((error) => {
            this.setState({modalError: true});  
        })
  }

  render() {

    let modalForm = (
      <div className="addDataContent">
        <h2>Delete Exercise</h2>
        <form id="dataForm">
            <p>All data for this exercise will be deleted.</p>
            <button type="submit" onClick={this.submit}>Yes</button>
            <button onClick={this.props.close}>No</button>
        </form>
      </div>
    );

    if (this.state.modalError) {
      modalForm = <ModalError title="Error" onClose={this.props.close}>Failed to delete exercise.</ModalError>
    }

    return (
      <div>
        {modalForm}
      </div>
    );
  }
}

export default ModalDelete;