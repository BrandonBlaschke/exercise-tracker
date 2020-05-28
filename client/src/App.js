import React, {Component} from 'react';
import './App.css';
import './css/login.css'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    
  this.state = {
    email: '',
    password: ''
  }
  }


  handleInput = (event) => {
    const target = event.target;
    if (target.name === "email") {
      this.setState({email: target.value});
    } else {
      this.setState({password: target.value});
    }
  }

  submit = (event) => {
    event.preventDefault();
    console.log(this.state.email, this.state.password);
    axios.post('/user', {
      name: "Name1",
      email: this.state.email,
      password: this.state.password
    })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  render() {
    return (
      <div className="login-page">
        <div className="form">
  
          <form className="login-form">
            <input onChange={this.handleInput} name="email" type="text" placeholder="username"/>
            <input onChange={this.handleInput} name="password" type="password" placeholder="password"/>
  
            <button onClick={this.submit}>login</button>
            <button onClick={this.submit}>Sign Up</button>
            <p className="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
