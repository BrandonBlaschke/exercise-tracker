import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import Main from './containers/main/main';
import Missing from './containers/missing/missing'

const routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/main" component={Main}/>
      <Route component={Missing}/>
    </Switch>
  </Router>
)

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
