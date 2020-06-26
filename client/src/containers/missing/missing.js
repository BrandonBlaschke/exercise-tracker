import React, {Component} from 'react';
import './missing.css';
import Header from '../../components/header/header'

class Missing extends Component {
  constructor(props) {
    super(props);
  }

  // TODO Probably create a image for this page.
  render() {
    return (
      <div>
        <Header/>
          <h1 className="largeMessage">404 Missing</h1>
      </div>
    );
  }
}

export default Missing;