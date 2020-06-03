import React, {Component} from 'react';
import "./exerciseList.css";
import ListItem from './listItem';

class ExerciseList extends Component {

  prepareList = () => {
    if (!this.props.data) {
      return null;
    }
    
    let newList = this.props.data.map((exerciseData) => {
      return <ListItem exercise={exerciseData.name} unit={exerciseData.unit}/>
    });
    return newList;
  }

  render() {

    return (
    <div class="courses-container">
        {this.prepareList()}
    </div>
    );
  }
}

export default ExerciseList;