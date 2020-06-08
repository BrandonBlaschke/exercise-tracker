import React, {Component} from 'react';
import axios from 'axios';
import './exercise.css'

import Graph from '../../components/graph/graph';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import DataPoint from '../../components/dataPoint/dataPoint';

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

  render() {

    let dataPoints = null;

    if (this.state.data) {
      dataPoints = this.state.data.dataPoints.map((dataPoint) => {
        let date = new Date(dataPoint.date);
        return <DataPoint value={dataPoint.data} date={`${date.getUTCMonth()}/${date.getUTCDay()}/${date.getUTCDay()}`}
        unit={this.state.data.unit}/>
      });
    }
    

    return (
    <div>
        <Header/>
        <div class="exercise-container">
            <Graph data={this.state.data}/>
        </div>
        <div className="exercise-container-list">
          {dataPoints}
        </div>
    </div>
    );
  }
}

export default Exercise;