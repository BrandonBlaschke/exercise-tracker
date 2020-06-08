import React, {Component} from 'react';
import "./dataPoint.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'

class DataPoint extends Component {

  render() {

    return (
    <div className="dataPoint">
      <div className="dataPoint-info">
        <span>{this.props.value} {this.props.unit}</span>
        <span>{this.props.date}</span>
      </div>
      <div className="dataPoint-buttons">
        <span className="button"><FontAwesomeIcon icon={faEdit} size="lg"/></span>
        <span className="button"><FontAwesomeIcon icon={faTrash} size="lg"/></span>
      </div>
    </div>
    );
  }
}

export default DataPoint;