import React, {Component} from 'react';
import axios from 'axios';

class ModalDelete extends Component {

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
            console.log(error);
        })
  }

  render() {

    return (
    <div className="addDataContent">
        <h2>Delete Exercise</h2>
        <form id="dataForm">
            <p>All data for this exercise will be deleted.</p>
            <button type="submit" onClick={this.submit}>Yes</button>
            <button onClick={this.props.close}>No</button>
        </form>
    </div>
    );
  }
}

export default ModalDelete;