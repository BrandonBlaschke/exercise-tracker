import React, {Component} from 'react';
import axios from 'axios';

import Graph from '../../components/graph/graph';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';

class Exercise extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      modal: false,
      loading: true,
      data: null,
    }
  }

  openModal = (data) => {
    this.setState({modal: true, modalData: data});
  }

  closeModal = () => {
    this.setState({modal: false});
  }

  componentDidMount () {
    const { id } = this.props.match.params
    
    let token = document.cookie.split(';')[0].split('=')[1]
    axios.get(`/exercise/${id}`, {
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
    return (
    <div>
        <Header/>
        <div style={{backgroundColor: "white"}}>
            <Graph data={this.state.data}/>
        </div>
    </div>
    );
  }
}

export default Exercise;