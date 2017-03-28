import React, { Component } from 'react';
import axios from 'axios';

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: null
    }
    console.log(this.state);
  }

  componentDidMount() {
    var self = this;
    axios.get("http://www.omdbapi.com/?i=" + this.props.params.movieID)
    .then(function (response) {
      console.log(response);
      self.setState(response.data);
    })
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h2>{this.state.Title}</h2>
        <img src={this.state.Poster} />
      </div>
    );
  }
}

export default Movie;
