import React, {Component} from 'react';
import axios from 'axios';
import "./modalAdd.css";

class ModalAdd extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        data: null,
        date: null,
        errorMsg: ''
      }
  }

  getDate = (event) => {
    const value = event.target.value;
    this.setState({date: new Date(value)});
  }

  getData = (event) => {
    const value = event.target.value;
    if (value < 0) {
        return this.setState({errorMsg: "Data must be above 0"})
    }
    this.setState({errorMsg: null, data: value});
  }

  submit = (event) => {
    event.preventDefault();
    let date = this.state.date;
    if (!date) {
        date = new Date();
    }

    const data = {
        _id: this.props.id,
        date: date.getTime(),
        data: this.state.data
    }

    const token = document.cookie.split(';')[0].split('=')[1]
    const headers = {
        headers: {Authorization: `Bearer ${token}`}
    }

    axios.post('/exercise/addData', data, headers)
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

    // Not working with react need to fix
    // let date = new Date();
    // let today = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    // '-' + date.getDate().toString().padStart(2, 0);

    return (
    <div className="addDataContent">
        <h2>Add Data Point</h2>
        <form id="dataForm">
            <label for="date">Date</label>
            <input onChange={this.getDate} name="date" type="date" required/>
            <label for="data">Data</label>
            <input onChange={this.getData} name="data" type="number" required/>
            {error}
            <button type="submit" onClick={this.submit}>Submit</button>
        </form>
    </div>
    );
  }
}

export default ModalAdd;