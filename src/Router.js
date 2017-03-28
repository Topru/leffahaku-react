import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import Movie from './components/Movie';
import Search from './components/Search'

export default (
  <Router history={browserHistory}>
      <Route exact path="/" component={Search} />
      <Route path="movie/:movieID" component={Movie} />
      <Route exact path="/search" component={App} />
  </Router>
);
