import React, { Component } from 'react';
import axios from 'axios';
import { Search as SearchBar, Icon } from 'semantic-ui-react'
import { Link } from 'react-router';
class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      resultStyle: {}
    }
    this.handleChange = this.handleChange.bind(this);
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
      if(movies.length>0){
        var resultStyle = {
          display: 'initial'
        }
      }
      self.setState({movies, search, resultStyle});
    })
  }
  markOccurence(input, text){
    var re = new RegExp(input,"i");
    var pos = text.search(re);
    var substr = text.substr(pos, input.length);
    var newstring = text.replace(re, substr.bold());
    return newstring
  }

  render() {
    return (
    <div className='title-bar'>
      <div className="search-container">
        <div className='ui search search-bar'>
          <div className='search-column'>
            <Link className="home-link" to="/"><Icon size="big" color='grey' inverted link name='home' /></Link>
            <SearchBar onSearchChange={this.handleChange} showNoResults={false} />
          </div>
          <div className={"results"} style={this.state.resultStyle}>
            {this.state.movies.map((movie, i) =>
                <a key={i} className='result' href={"/movie/" + movie.imdbID} >
                  <div dangerouslySetInnerHTML={{__html: this.markOccurence(this.state.search, movie.Title)}}></div>
                </a>
            )}
          </div>
        </div>
        </div>
    </div>
    );
  }
}

export default Search;
