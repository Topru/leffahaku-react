import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Image, Header, Accordion, Icon } from 'semantic-ui-react';

import LatestSearch from './LatestSearch'

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: null
    }
  }

  componentDidMount() {
    var self = this;
    axios.get("http://www.omdbapi.com/?i=" + this.props.params.movieID)
    .then(function (response) {
      self.setState(response.data);
      var lastSearches = localStorage.getItem('searches');
      if(lastSearches === null){
        lastSearches = [];
      }
      else{
        lastSearches = JSON.parse(lastSearches);
      }
      var searchExists = false;
      lastSearches.forEach(function(e){
        if(e.MovieID === self.props.params.movieID){
          var index = lastSearches.indexOf(e);
          lastSearches.splice(index, 1);
        }
      })
      if(lastSearches.length >= 10){
        lastSearches.splice(0, 1);
      }
      if(!searchExists){
        lastSearches.push({MovieID: self.props.params.movieID, Title: response.data.Title})
        localStorage.setItem('searches', JSON.stringify(lastSearches));
      }
      console.log(localStorage.getItem('searches'))
    });
  }

  render() {
    return (
      <Grid columns={3} divided>
        <Grid.Row>

          <Grid.Column>
            <Image src={this.state.Poster} fluid />
          </Grid.Column>

          <Grid.Column>
            <Header>{this.state.Title} <small>({this.state.Runtime})</small></Header>
            <p><b>imdb arvosana:</b> {this.state.imdbRating}</p>
            <p><b>Metascore: </b>{this.state.Metascore}</p>
            <p><b>Ohjaaja: </b>{this.state.Director}</p>
            <p><b>Juoni (eng): </b>{this.state.Plot}</p>
          </Grid.Column>

          <Grid.Column>
            <Accordion>
              <Accordion.Title>
                <Icon name='dropdown' />
                Linkkejä
              </Accordion.Title>
              <Accordion.Content>
                <a href={this.state.Website}>{this.state.Title}</a>
              </Accordion.Content>
            </Accordion>
            <LatestSearch/>
          </Grid.Column>

        </Grid.Row>

      </Grid>
    );
  }
}

export default Movie;
