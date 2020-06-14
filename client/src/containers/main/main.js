import React, {Component} from 'react';
import axios from 'axios';
import Header from '../../components/header/header'
import ExerciseList from '../../components/exercisesList/exerciseList'

class Main extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      data: null
    }
  }

  getExercises = () => {
      let token = document.cookie.split(';')[0].split('=')[1]
      axios.get('/exercise', {
          headers: {Authorization: `Bearer ${token}`}
      }).then((res) => {
          this.setState({loading: false, data:res.data});
          console.log(res.data);
      }).catch((e) => {
          this.setState({loading: false});
          console.log(e);
      })
  }

  render() {
    let exercises = this.state.data === null ? this.getExercises() : this.state.data;

    return (
      <div>
        <Header {...this.props}/>
        <ExerciseList data={this.state.data}/>
      </div>
    );
  }
}

export default Main;