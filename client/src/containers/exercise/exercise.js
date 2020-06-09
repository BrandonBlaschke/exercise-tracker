import React, {Component} from 'react';
import axios from 'axios';
import './exercise.css'

import Graph from '../../components/graph/graph';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

class Exercise extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      modal: false,
      loading: true,
      data: null,
    }
  }

  openModal = (data) => {
    this.setState({modal: true, modalData: data});
  }

  closeModal = () => {
    this.setState({modal: false});
  }

  componentDidMount () {
    const { id } = this.props.match.params
    
    let token = document.cookie.split(';')[0].split('=')[1]
    axios.get(`/exercise/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
    }).then((res) => {
        this.setState({loading: false, data:res.data});
        console.log(res.data);
    }).catch((e) => {
        this.setState({loading: false});
        console.log(e);
    })
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
      let formattedDate = `${date.getUTCMonth()}/${date.getUTCDay()}/${date.getUTCDay()}`;
      return (
        <tr>
          <td>{formattedDate}</td>
          <td>{dataPoint.data}</td>
          <td>{this.state.data.unit}</td>
          <td><span className="button"><FontAwesomeIcon icon={faEdit} size="lg"/></span></td>
          <td><span className="button"><FontAwesomeIcon icon={faTrash} size="lg"/></span></td>
        </tr>
      )
    });
    
    return dataPoints;
  }

  render() {

    let dataPoints = this.prepareData();
    
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
    </div>
    );
  }
}

export default Exercise;