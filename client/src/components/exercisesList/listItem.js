import React, {Component} from 'react';
import "./exerciseList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons'

class ListItem extends Component {

  render() {

    return (
      <div>
        <div className="exercise">
          <div className="exercise-info" onClick={this.props.action}>
            <span className="exercise-name">{this.props.exercise}</span>
            <span className="exercise-updates">Updates: {this.props.updates}</span>
          </div>
          <div className="exercise-buttons">
            <span onClick={this.props.add}><FontAwesomeIcon icon={faPlus} size="sm"/></span>
            <span onClick={this.props.edit}><FontAwesomeIcon icon={faEdit} size="sm"/></span>
            <span onClick={this.props.delete}><FontAwesomeIcon icon={faTrash} size="sm"/></span>  
          </div>
        </div>
      </div>
    );
  }
}

export default ListItem;