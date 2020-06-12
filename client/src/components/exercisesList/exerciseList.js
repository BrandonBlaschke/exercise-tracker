import React, {Component} from 'react';
import "./exerciseList.css";
import ListItem from './listItem';
import { withRouter } from "react-router-dom";
import Modal from '../modal/modal';
import axios from 'axios';
import ModalAdd from '../modal-add/modalAdd';
import ModalEdit from '../modal-edit/modalEdit';
import ModalDelete from '../modal-delete/modalDelete';

class ExerciseList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      modal: false,
      modalData: null,
      modalForm: "add"
    }
  }

  openModal = (data, modalForm) => {
    this.setState({modal: true, modalData: data, modalForm});
  }

  closeModal = () => {
    this.setState({modal: false});
  }

  goToPage = (id) => {
    // TODO: Hacky, try and find a better way
    this.props.history.push(`/exercisePage/${id}`);
    window.location.reload();
  }

  renameExercise = (id, name) => {
    let index = this.props.data.findIndex((exercise) => exercise._id === id)
    this.props.data[index]["name"] = name;
  }

  deleteExercise = (id) => {
    let index = this.props.data.findIndex((exercise) => exercise._id === id)
    this.props.data.splice(index, 1);
    this.setState({modalData: this.props.data})
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
        add={() => this.openModal(exerciseData._id, "add")}
        edit={() => this.openModal(exerciseData._id, "edit")}
        delete={() => this.openModal(exerciseData._id, "delete")}/>
    });
    return newList;
  }

  render() {

    let modalForm;
    if (this.state.modalForm === "add") {
      modalForm = <ModalAdd id={this.state.modalData} close={this.closeModal}/>
    } else if (this.state.modalForm === "edit") {
      modalForm = <ModalEdit id={this.state.modalData} rename={this.renameExercise} close={this.closeModal}/>;
    } else {
      modalForm = <ModalDelete id={this.state.modalData} close={this.closeModal} delete={this.deleteExercise}/>;
    }

    return (
    <div class="courses-container">
        {this.prepareList()}
        <Modal show={this.state.modal} onClose={this.closeModal}>
          {modalForm}
        </Modal>
    </div>
    );
  }
}

export default withRouter(ExerciseList);