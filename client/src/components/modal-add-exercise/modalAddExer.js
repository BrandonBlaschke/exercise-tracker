import React, {Component} from 'react';
import axios from 'axios';

class ModalAddExer extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        name: null,
        unit: null,
        errorMsg: ''
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
        unit: this.state.unit,
        name: this.state.name
    }

    const token = document.cookie.split(';')[0].split('=')[1]
    const headers = {
        headers: {Authorization: `Bearer ${token}`}
    }

    axios.post('/exercise', data, headers)
      .then((res) => {
        this.props.close();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {

    let error = null;
    if (this.state.errorMsg) {
        error = <span>{this.state.errorMsg}</span>
    }

    return (
    <div className="addDataContent">
        <h2>Create Exercise</h2>
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
  }
}

export default ModalAddExer;