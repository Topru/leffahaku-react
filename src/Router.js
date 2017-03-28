import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import Movie from './components/Movie';

export default (
  <Router history={browserHistory}>
      <Route exact path="/" component={App} />
      <Route path="movie/:movieID" component={Movie} />
  </Router>
);
