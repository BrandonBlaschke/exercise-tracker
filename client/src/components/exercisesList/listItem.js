import React, {Component} from 'react';
import "./exerciseList.css";

class ListItem extends Component {

  render() {

    return (
    <div onClick={this.props.action} class="course">
      <h2 className="exercise-name">{this.props.exercise}</h2>
      <h2 className="exercise-updates">Updates: {this.props.updates}</h2>
    </div>
    );
  }
}

export default ListItem;