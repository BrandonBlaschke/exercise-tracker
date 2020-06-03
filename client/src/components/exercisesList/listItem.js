import React, {Component} from 'react';
import "./exerciseList.css";

class ListItem extends Component {

  render() {

    return (
    <div class="course">
        <div class="course-preview">
            <h6>Exercise</h6>
            <h2>{this.props.exercise}</h2>
        </div>
        <div class="course-info">
            <h6>Unit: {this.props.unit}</h6>
            <h2>Graph</h2>
            <button class="btn">Update</button>
        </div>
    </div>
    );
  }
}

export default ListItem;