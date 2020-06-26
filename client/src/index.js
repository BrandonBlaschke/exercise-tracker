import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import Main from './containers/main/main';
import Missing from './containers/missing/missing'
import Exercise from './containers/exercise/exercise';

const routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/main" component={Main}/>
      <Route path="/exercisePage/:id" component={Exercise}/>
      <Route component={Missing}/>
    </Switch>
  </Router>
)

ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
