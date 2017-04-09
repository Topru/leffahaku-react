import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Image, Header, Accordion, Icon } from 'semantic-ui-react';
import cookie from 'react-cookie';
import moment from 'moment';


class Movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
        movie: null,
        omdb: null
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
      self.setState({omdb: response.data});
    });
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
       starRating = starRating + "<i class='star icon'></i>";
       starCount++;
    }
    if(splitStars[1] >= 0.75) {
       starRating = starRating + "<i class='star icon'></i>";
       starCount++;
    }
    else if(splitStars[1] >= 0.5 && splitStars[1] < 0.75) {
        starRating = starRating + "<i class='star half empty icon'></i>";
        starCount++;
    }
    while(starCount < 5) {
        starRating = starRating + "<i class='star empty icon'></i>";
        starCount++;
    }
    return {__html: starRating}
  }



  render() {
    console.log(this.state);
    var movie = this.state.movie;
    var omdb = this.state.omdb;
    var basepath = 'http://image.tmdb.org/t/p';
    if(movie === null || omdb === null) return <span>loading data</span>;
    return (
      
      <Grid columns={3} divided className={'movie-details'}>
      <div className={"backdrop"}><img src={basepath + '/w1920/' + movie.backdrop_path} /></div>
      <div className={"backdrop-overlay"}></div>
        <Grid.Row>

          <Grid.Column className={'poster'}>
            <Image src={basepath + '/original/' + movie.poster_path} fluid />
          </Grid.Column>

          <Grid.Column>
            <Header>{movie.original_title}</Header>
            <p>{moment(movie.release_date, 'YYYY-MM-DD').format('DD.MM.YYYY')} - {omdb.Runtime}</p>
            <p dangerouslySetInnerHTML={this.getStars(omdb.imdbRating)}></p>
            <p><b>Metascore: </b>{omdb.Metascore}</p>
            <p><b>Ohjaaja: </b>{omdb.Director}</p>
            <p><b>Juoni (eng): </b>{movie.overview}</p>
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
            <p></p>
          </Grid.Column>

        </Grid.Row>

      </Grid>
    );
  }
}

export default Movie;
