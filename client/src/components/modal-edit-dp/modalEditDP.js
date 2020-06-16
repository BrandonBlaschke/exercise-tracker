import React, {Component} from 'react';
import axios from 'axios';

class ModalEditDP extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
        value: null,
        errorMsg: ''
      }
  }

  getValue = (event) => {
    const value = event.target.value;
    if (!value || value < 0) {
        return this.setState({errorMsg: "Value must be not be negative", value: null});
    }
    this.setState({errorMsg: null, value: value});
  }

  submit = (event) => {
    event.preventDefault();

    if (this.state.value === null || !this.state.value) {
      return this.setState({errorMsg: "Please give a value"});
    }

    this.props.data.dataPoint.data = this.state.value;

    const data = {
        _id: this.props.data._id,
        dataPoint: this.props.data.dataPoint
    }

    const token = document.cookie.split(';')[0].split('=')[1]
    const headers = {
        headers: {Authorization: `Bearer ${token}`}
    }

    axios.patch('/exercise', data, headers)
      .then((res) => {
        console.log("SUCCESS")
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
        <h2>Edit Data Point</h2>
        <form id="dataForm">
            <label for="value">Value</label>
            <input onChange={this.getValue} name="value" type="number" required/>
            {error}
            <button type="submit" onClick={this.submit}>Submit</button>
        </form>
    </div>
    );
  }
}

export default ModalEditDP;