import React, {Component} from 'react';
import axios from 'axios';
import ModalError from '../modal-error/modalError';
import "./modalEdit.css";

class ModalEdit extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        name: null,
        unit: null,
        errorMsg: '',
        modalError: false
      }
  }

  getName = (event) => {
    const value = event.target.value;
    if (!value || value.length < 1 || value.length > 20) {
        return this.setState({errorMsg: "Name must be 1 and 20 characters"})
    }
    this.setState({errorMsg: null, name: value});
  }

  getUnit = (event) => {
    const value = event.target.value;
    console.log(event.target);
    if (value === "" || !value) {
      return this.setState({errorMsg: "Please select unit"});
    }
    this.setState({errorMsg: null, unit: value});
  }

  submit = (event) => {
    event.preventDefault();

    if (this.state.unit === "" || !this.state.unit) {
      return this.setState({errorMsg: "Please select unit"});
    }

    if (!this.state.name || this.state.name.length < 1 || this.state.name.length > 20) {
      return this.setState({errorMsg: "Name must be 1 and 20 characters"})
    }

    const data = {
        _id: this.props.id,
        unit: this.state.unit,
        name: this.state.name
    }

    const token = document.cookie.split(';')[0].split('=')[1]
    const headers = {
        headers: {Authorization: `Bearer ${token}`}
    }

    axios.patch('/exercise', data, headers)
      .then((res) => {
        this.props.rename(this.props.id, this.state.name);
        this.props.close();
      })
      .catch((error) => {
        this.setState({modalError: true});
      })
  }

  render() {

    let error = null;
    if (this.state.errorMsg) {
        error = <span>{this.state.errorMsg}</span>
    }

    let modalForm = (
      <div className="addDataContent">
          <h2>Edit Exercise</h2>
          <form id="dataForm">
              <label for="name">Name</label>
              <input onChange={this.getName} name="name" type="text" required/>
              <label for="unit">Unit Type</label>
              <select className="select" onChange={this.getUnit} name="unit" required>
                <option value="">--Choose an option--</option>
                <option value="lb">Pounds (lb)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="time">Time</option>
                <option value="reps">Repetitions (reps)</option>
            </select>
              {error}
              <button type="submit" onClick={this.submit}>Submit</button>
          </form>
      </div>
    );

    if (this.state.modalError) {
      modalForm = <ModalError onClose={this.props.close} title="Error">Failed to modify exercise data.</ModalError>
    }

    return (
      <div>
        {modalForm}
      </div>
    );
  }
}

export default ModalEdit;