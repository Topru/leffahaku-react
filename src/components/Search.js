import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
    this.handleChange = this.handleChange.bind(this);
    console.log(this.state);
  }

  componentDidMount() {
  }
  handleChange(event){
    var self = this;
    var search = event.target.value;
    axios.get("http://www.omdbapi.com/?s=" + search)
    .then(function (response) {
      var movies = response.data.Search
      if(movies === undefined) movies = [];
      self.setState({movies, search});
    })
  }
  markOccurence(input, text){
    var re = new RegExp(input,"gi");
    var pos = text.search(re);
    var substr = text.substr(pos, input.length);
    var newstring = text.replace(re, substr.bold());
    return newstring
  }

  render() {
    return (
      <div className={"search-container"}>
        <input id={"search"} type={"search"} onChange={this.handleChange} />
        <div className={"suggestion-container"}>
          {this.state.movies.map((movie, i) =>
            <li key={i} className={"search-suggestion"}>
              <a href={"movie/" + movie.imdbID} >
                <div dangerouslySetInnerHTML={{__html: this.markOccurence(this.state.search, movie.Title)}}></div>
              </a>
            </li>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
