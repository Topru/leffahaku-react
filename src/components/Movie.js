import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Image, Header, Accordion, Icon } from 'semantic-ui-react';

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
          </Grid.Column>

        </Grid.Row>

      </Grid>
    );
  }
}

export default Movie;
