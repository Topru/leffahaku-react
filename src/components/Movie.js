import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Image, Header, Accordion, Icon } from 'semantic-ui-react';
import cookie from 'react-cookie';

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
      console.log(response);
      self.setState(response.data);
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
    console.log(rating);
    return {__html: starRating}
  }



  render() {
    return (
      <Grid columns={3} divided>
        <Grid.Row>

          <Grid.Column>
            <Image src={this.state.Poster} fluid />
          </Grid.Column>

          <Grid.Column>
            <Header>{this.state.Title}</Header>
            <p>{this.state.Year} - {this.state.Runtime}</p>
            <p dangerouslySetInnerHTML={this.getStars(this.state.imdbRating)}></p>
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
            <Header>Viimeisimmät hakusi</Header>
            <p></p>
          </Grid.Column>

        </Grid.Row>

      </Grid>
    );
  }
}

export default Movie;
