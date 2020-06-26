import React, {Component} from 'react';
import axios from 'axios';
import './exercise.css'

import Graph from '../../components/graph/graph';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import ModalEditDP from '../../components/modal-edit-dp/modalEditDP';
import ModalDeleteDP from '../../components/modal-delete-dp/modalDeleteDP';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

class Exercise extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      modal: false,
      modalType: "edit",
      modalData: null,
      loading: true,
      data: null,
    }
  }

  openModal = (modalType, data) => {
    this.setState({modal: true, modalData: data, modalType});
  }

  closeModal = () => {
    this.setState({modal: false});
  }

  componentDidMount () {
    const { id } = this.props.match.params
    let token = document.cookie.split(';')[0].split('=')[1];
    axios.get(`/exercise/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
    }).then((res) => {
        this.setState({loading: false, data:res.data});
    }).catch((e) => {
        this.setState({loading: false});
    })
  }

  removeDataPoint = (id) => {
    let index = this.state.data.dataPoints.find((dataPoint) => dataPoint._id === id);
    this.state.data.dataPoints.splice(index, 1);
    this.setState({data: this.state.data});
  }

  prepareData = () => {
    if (!this.state.data) {
      return null;
    }

    let sorted = this.state.data.dataPoints.sort((data1, data2) => {
      data1 = new Date(data1.date);
      data2 = new Date(data2.date);
      return data2 - data1;
    })

    let dataPoints = sorted.map((dataPoint) => {
      let date = new Date(dataPoint.date);
      let formattedDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`;
      let modalData = {_id: this.state.data._id, dataPoint: dataPoint}
      return (
        <tr>
          <td>{formattedDate}</td>
          <td>{dataPoint.data}</td>
          <td>{this.state.data.unit}</td>
          <td><span onClick={() => this.openModal("edit", modalData)} className="button"><FontAwesomeIcon icon={faEdit} size="lg"/></span></td>
          <td><span onClick={() => this.openModal("delete", modalData)} className="button"><FontAwesomeIcon icon={faTrash} size="lg"/></span></td>
        </tr>
      )
    });
    
    return dataPoints;
  }

  render() {

    let dataPoints = this.prepareData();

    let modal;
    if (this.state.modalType === "edit") {
      modal = <ModalEditDP data={this.state.modalData} close={this.closeModal}/>
    } else {
      modal = <ModalDeleteDP remove={this.removeDataPoint} data={this.state.modalData} close={this.closeModal}/>
    }
    
    return (
    <div>
        <Header/>
        <div class="exercise-container">
            <Graph data={this.state.data}/>
        </div>
        <div className="exercise-container-list">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {dataPoints}
            </tbody>
          </table>
        </div>
        <Modal show={this.state.modal} onClose={this.closeModal}>
          {modal}
        </Modal>
    </div>
    );
  }
}

export default Exercise;