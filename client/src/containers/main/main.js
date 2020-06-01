import React, {Component} from 'react';
import axios from 'axios';
import Header from '../../components/header/header'

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
    }
  }

  getExercises = () => {
      let token = document.cookie.split(';')[0].split('=')[1]
      axios.get('/exercise', {
          headers: {Authorization: `Bearer ${token}`}
      }).then((res) => {
          console.log(res);
      }).catch((e) => {
          console.log(e);
      })
  }

  render() {
    let exercises = this.getExercises();

    return (
      <div>
        <Header/>
      </div>
    );
  }
}

export default Main;