import React, {Component} from 'react';
import "./exerciseList.css";
import ListItem from './listItem';

class ExerciseList extends Component {

  render() {

    return (
    <div class="courses-container">
        <ListItem exercise="DeadLift" date="5/1/2020"/>
        <ListItem exercise="Squat" date="5/23/2020"/>
    </div>
    );
  }
}

export default ExerciseList;