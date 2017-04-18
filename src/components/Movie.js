import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Image, Header, Accordion, Icon } from 'semantic-ui-react';

import LatestSearch from './LatestSearch'

class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
        movie: null,
        omdb: null,
        backdropStatus: false,
        posterStatus: false
    }
  }

  componentDidMount() {
    var apikey = '59c2234706669494497c4b06c4089a5b';
    var self = this;
    axios.get("https://api.themoviedb.org/3/find/" + this.props.params.movieID + "?api_key=" + apikey + "&language=en-US&external_source=imdb_id")
    .then(function (response) {
      self.setState({movie: response.data.movie_results[0]});
    });
    axios.get("http://www.omdbapi.com/?i=" + this.props.params.movieID)
    .then(function (response) {
      if(response.data.Response === "False") {
          self.setState({omdb: false});
          return;
      }
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
      self.setState({omdb: response.data});
    });
  }

  handleBackdropLoaded(){
    this.setState({backdropStatus: true});
  }
  handlePosterLoaded(){
    this.setState({posterStatus: true});
  }

  getStars(rating){
    var stars = rating/2;
      var splitStars =
        [
          (stars > 0) ? Math.floor(stars) : Math.ceil(stars),
          stars % 1
        ];
    var starRating = '';
    var starCount = 0;
    for(var i=1; i<stars; i++){
       starRating += "<i class='star icon'></i>";
       starCount++;
    }
    if(splitStars[1] >= 0.75) {
       starRating += "<i class='star icon'></i>";
       starCount++;
    }
    else if(splitStars[1] >= 0.5 && splitStars[1] < 0.75) {
        starRating += "<i class='star half empty icon'></i>";
        starCount++;
    }
    while(starCount < 5) {
        starRating += "<i class='star empty icon'></i>";
        starCount++;
    }
    return {__html: starRating}
  }

  render() {
      console.log(this.state);
    var movie = this.state.movie;
    var omdb = this.state.omdb;
    var basepath = 'http://image.tmdb.org/t/p';
    var loaderStyle = {display: 'initial'};
    //console.log(typeof movie.poster_path);
    if(this.state.backdropStatus && this.state.posterStatus){
      loaderStyle = {display: 'none'};
    } else if(typeof movie === "undefined") {
      loaderStyle = {display: 'none'};
    }
    if(omdb === false) return (
      <div className="ui segment loader-container">
        <div className="ui active dimmer">
          <div className="ui text loader">Error loading data</div>
        </div>
      </div>
    );

    if(movie === null || omdb === null ) return (
      <div className="ui segment loader-container">
        <div className="ui active dimmer">
          <div className="ui text loader">Loading data</div>
        </div>
      </div>
    );
    return (
    <div>
      <div className="ui segment loader-container loader-images" style={loaderStyle}>
        <div className="ui active dimmer">
          <div className="ui text loader">Loading images</div>
        </div>
      </div>
      <div className='main-container'>
        <div className={"backdrop"}>
            {console.log(typeof movie)}
            {typeof movie !== "undefined" &&
              <img src={basepath + '/w1920/' + movie.backdrop_path}
                   onLoad={this.handleBackdropLoaded.bind(this)}
                   alt={''}/>
            }
        </div>
        <div className={"backdrop-overlay"}></div>
        <Grid columns={3} className={'movie-details centered'} relaxed>

          <Grid.Row>
            <Grid.Column className={'poster'} width={1}>
            </Grid.Column>
            <Grid.Column className={'poster'} width={4}>
            {omdb.Poster !== "N/A" &&
              <Image src={omdb.Poster}
                     onLoad={this.handlePosterLoaded.bind(this)} fluid 
                     alt={"poster"} />
            }
            </Grid.Column>

            <Grid.Column width={5}>
              <Header>{omdb.Title}</Header>
              <p>{omdb.Released} - {omdb.Runtime}</p>
              <p dangerouslySetInnerHTML={this.getStars(omdb.imdbRating)}></p>
              <p><b>Metascore: </b>{omdb.Metascore}</p>
              <p><b>Ohjaaja: </b>{omdb.Director}</p>
              <p><b>Juoni (eng): </b>{omdb.Plot}</p>
            </Grid.Column>

            <Grid.Column>
              <Accordion>
                <Accordion.Title>
                  <Icon name='dropdown' />
                  Linkkejä
                </Accordion.Title>
                <Accordion.Content>
                  <a href={omdb.Website}>{omdb.Title}</a>
                </Accordion.Content>
              </Accordion>
              <Header>Viimeisimmät hakusi</Header>
              <LatestSearch/>
            </Grid.Column>

          </Grid.Row>

        </Grid>
      </div>
    </div>
    );
  }
}

export default Movie;
