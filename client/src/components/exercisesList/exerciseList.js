import React, {Component} from 'react';
import "./exerciseList.css";
import ListItem from './listItem';
import { withRouter } from "react-router-dom";
import Modal from '../modal/modal';

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

  prepareList = () => {
    if (!this.props.data) {
      return null;
    }

    let newList = this.props.data.map((exerciseData) => {
      return <ListItem 
        action={() => this.goToPage(exerciseData._id)} 
        exercise={exerciseData.name} 
        updates={exerciseData.dataPoints.length}/>
    });
    return newList;
  }

  render() {

    return (
    <div class="courses-container">
        {this.prepareList()}
        <Modal show={this.state.modal} onClose={this.closeModal} data={this.state.modalData}/>
    </div>
    );
  }
}

export default withRouter(ExerciseList);