import React, {Component} from 'react';
import axios from 'axios';

class ModalDeleteDP extends Component {

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
            console.log(error);
        })
  }

  render() {

    return (
    <div className="addDataContent">
        <h2>Delete Exercise</h2>
        <form id="dataForm">
            <p>Warning, data point will be permanently deleted.</p>
            <button type="submit" onClick={this.submit}>Yes</button>
            <button onClick={this.props.close}>No</button>
        </form>
    </div>
    );
  }
}

export default ModalDeleteDP;