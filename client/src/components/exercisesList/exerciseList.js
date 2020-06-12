import React, {Component} from 'react';
import "./exerciseList.css";
import ListItem from './listItem';
import { withRouter } from "react-router-dom";
import Modal from '../modal/modal';
import axios from 'axios';
import ModalAdd from '../modal-add/modalAdd';

class ExerciseList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      modal: false,
      modalData: null
    }
  }

  openModal = (data) => {
    this.setState({modal: true, modalData: data});
  }

  closeModal = () => {
    this.setState({modal: false});
  }

  goToPage = (id) => {
    // TODO: Hacky, try and find a better way
    this.props.history.push(`/exercisePage/${id}`);
    window.location.reload();
  }

  deleteExercise = (id) => {
    let token = document.cookie.split(';')[0].split('=')[1]
    axios.delete(`/exercise/${id}`, {
      headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
        let index = this.props.data.findIndex((exercise) => exercise._id === id)
        this.props.data.splice(index, 1);
        this.setState({modalData: this.props.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  prepareList = () => {
    if (!this.props.data) {
      return null;
    }

    let newList = this.props.data.map((exerciseData) => {
      return <ListItem 
        action={() => this.goToPage(exerciseData._id)} 
        exercise={exerciseData.name} 
        updates={exerciseData.dataPoints.length}
        add={() => this.openModal(exerciseData._id)}
        delete={() => this.deleteExercise(exerciseData._id)}/>
    });
    return newList;
  }

  render() {

    return (
    <div class="courses-container">
        {this.prepareList()}
        <Modal show={this.state.modal} onClose={this.closeModal}>
          <ModalAdd data={this.state.modalData}/>
        </Modal>
    </div>
    );
  }
}

export default withRouter(ExerciseList);