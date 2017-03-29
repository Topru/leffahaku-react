import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';

import Movie from './components/Movie';
import Frontpage from './components/Frontpage'
import Layout from './components/Layout'

export default (
  <Router history={browserHistory}>
      <Route exact path="/" component={Layout}>
        <IndexRoute component={Frontpage}/>
        <Route path="movie/:movieID" component={Movie} />
        <Route exact path="/search" component={App} />
      </Route>
  </Router>
);
