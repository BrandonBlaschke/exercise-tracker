import React, {Component} from 'react';
import axios from 'axios';
import Header from '../../components/header/header'
import ExerciseList from '../../components/exercisesList/exerciseList'
import Modal from '../../components/modal/modal';
import ModalError from '../../components/modal-error/modalError';

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      data: null,
      modalOpen: false
    }
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  getExercises = () => {
      let token = document.cookie.split(';')[0].split('=')[1]
      axios.get('/exercise', {
          headers: {Authorization: `Bearer ${token}`}
      }).then((res) => {
          this.setState({loading: false, data:res.data});
      }).catch((e) => {
          this.setState({loading: false, modalOpen: true});
      })
  }

  updateList = (exercise) => {
    this.state.data.push(exercise);
    this.setState({data: this.state.data});
  }

  render() {
    if (this.state.loading) {
      let exercises = this.state.data === null ? this.getExercises() : this.state.data;
    }

    return (
      <div>
        <Header {...this.props} update={this.updateList}/>
        <ExerciseList data={this.state.data}/>
        <Modal show={this.state.modalOpen} onClose={this.closeModal}>
          <ModalError title="Request Failed" onClose={this.closeModal}>Failed to get exercise data.</ModalError>
        </Modal>
      </div>
    );
  }
}

export default Main;