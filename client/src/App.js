import React, {Component} from 'react';
import './App.css';
import './css/login.css'
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      passwordCheck: false,
      isSignUp: false,
      loading: false,
      errorMsg: ''
    }
  }


  handleInput = (event) => {
    const target = event.target;
    if (target.name === "email") {
      this.setState({email: target.value});
    } else if (target.name === "password") {
      this.setState({password: target.value});
    } else {
      let isMatch = this.state.password === target.value;
      let msg = isMatch ? null : "Passwords do not match"
      this.setState({passwordCheck: isMatch, errorMsg: msg});
    }
  }

  submit = (event) => {
    event.preventDefault();
    console.log(this.state.email, this.state.password);

    if (!this.state.passwordCheck && this.state.isSignUp) return;
    
    let url = this.state.isSignUp ? "/user" : "/user/login";
    this.setState({loading: true});

    axios.post(url, {
      email: this.state.email,
      password: this.state.password
    })
    .then((res) => {
      this.setState({loading: false});
      document.cookie = "token=" + res.data.token;
      this.props.history.push('/main');
    })
    .catch((error) => {
      this.setState({loading: false});

      // TODO: Make custom error message from backend
      if (error.response.status === 400) {
        this.setState({errorMsg: "Credentials Failed"});
      } else if (error.response.status === 500) {
        this.setState({errorMsg: "Server Error"});
      } else {
        this.setState({errorMsg: "Failed to make request"});
      }
    })
  }

  render() {
    let passwordCheck = this.state.isSignUp ? <input onChange={this.handleInput} name="passwordCheck" type="password" placeholder="Reenter password" required/> : null;
    let errorMsg = this.state.errorMsg ? <p className="errorMessage">{this.state.errorMsg}</p> : null;

    let buttonTitle = "Login"
    if (this.state.loading) {
     buttonTitle = "Authorizing";
    } else if (this.state.isSignUp) {
      buttonTitle = "Sign Up";
    }

    return (
      <div className="login-page">
        <div className="form">
  
          <form className="login-form" id="loginForm" onSubmit={this.submit}>
            <input onChange={this.handleInput} name="email" type="text" placeholder="Email" required/>
            <input onChange={this.handleInput} name="password" type="password" placeholder="Password" required/>
            {passwordCheck}
            {errorMsg}
            
            <button type="submit">{buttonTitle}</button>
            <label for="signup" className="message">Not registered? Sign up now </label>
            <input style={{width: "auto", marginTop: "5px", verticalAlign: "top"}} name="signup" onClick={e => this.setState({isSignUp: e.target.checked})} type="checkbox"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
