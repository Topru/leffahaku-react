import React, { Component } from 'react';
import axios from 'axios';
import { Search as SearchBar, Grid, Header } from 'semantic-ui-react'
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
        <Grid className='ui search'>
          <Grid.Column color="blue" width={16} >
            <SearchBar onSearchChange={this.handleChange} showNoResults={false} />
          </Grid.Column>
          <div className={"results"} style={this.state.resultStyle}>
            {this.state.movies.map((movie, i) =>
                <a className='result' href={"movie/" + movie.imdbID} >
                  <div dangerouslySetInnerHTML={{__html: this.markOccurence(this.state.search, movie.Title)}}></div>
                </a>
            )}
          </div>
        </Grid>
    );
  }
}

export default Search;
