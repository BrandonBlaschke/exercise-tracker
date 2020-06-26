import React, {Component} from 'react';
import axios from 'axios';
import ModalError from '../modal-error/modalError';

class ModalDeleteDP extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalError: false
    }
  }

  submit = (event) => {
    event.preventDefault();

    let token = document.cookie.split(';')[0].split('=')[1];
    let url = `/exercise?id=${this.props.data._id}&dataPointID=${this.props.data.dataPoint._id}`;
    axios.delete(url, {
        headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
            this.props.remove(this.props.data.dataPoint._id);
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
            <p>Warning, data point will be permanently deleted.</p>
            <button type="submit" onClick={this.submit}>Yes</button>
            <button onClick={this.props.close}>No</button>
        </form>
      </div>
    );

    if (this.state.modalError) {
      modalForm = <ModalError onClose={this.props.close} title="Error">Failed to delete data point.</ModalError>
    }

    return (
      <div>
        {modalForm}
      </div>
    );
  }
}

export default ModalDeleteDP;