import React, { Component } from 'react';
import { Grid, Header, Icon, Container, List } from 'semantic-ui-react'

import LatestSearch from './LatestSearch'

class Frontpage extends Component {

  render() {
    return (
      <div className="content">
        <Grid stackable columns={3}>
          <Grid.Row>
            <Grid.Column width={16}>
              <Container text>
                <Header inverted className="mastheader" as='h1' textAlign='center'>
                Elokuvahaku
                <Header.Subheader>By Topias J. ja Markus M.</Header.Subheader>
                </Header>
              </Container>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>

            <Grid.Column>
              <Header as='h2' inverted>
                <Icon name='info' />
                <Header.Content>
                  Esittely
                </Header.Content>
              </Header>
              <p>Tervetuloa käyttämään tekemäämme elokuvahakua.</p>
              <p>Tämän projektin tarkoituksena oli näyttää kuinka tehdään
              AJAX:ia hyödyntävä elokuvahaku Reactilla. Elokuvatiedot haetaan OMBD:n ja TMDb:n avoimista rajapinnoista.</p>
              <p>Voit aloittaa hakemisen syöttämällä osan haluamasi elokuvan nimestä ja valitsemalla sen sitten hakukoneen ehdotuksista.</p>
            </Grid.Column>

            <Grid.Column>
              <Header as='h2' inverted>
                <Icon name='settings' />
                <Header.Content>
                  Käytetyt teknologiat
                </Header.Content>
              </Header>
              <Container text>
              <List>
              <List.Item>
                <List.Content>Teknologiat</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='book' />
                <List.Content><a href="https://facebook.github.io/react/">React</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='book' />
                <List.Content><a href="http://react.semantic-ui.com/introduction">Semantic UI</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='book' />
                <List.Content><a href="https://www.npmjs.com/package/react-axios">Axios</a></List.Content>
              </List.Item>
              <List.Item>
              </List.Item>

              <List.Item>
                <List.Content>Rajapinnat</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='book' />
                <List.Content><a href="http://www.omdbapi.com/">OMDb</a></List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='book' />
                <List.Content><a href="https://www.themoviedb.org/">TMDb</a></List.Content>
              </List.Item>
              <List.Item>
              </List.Item>

              <List.Item>
                <List.Content>GitHub</List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='github' />
                <List.Content><a href="https://github.com/mmeklin15/leffahaku">Projektin GitHub</a></List.Content>
              </List.Item>
            </List>

              </Container>
            </Grid.Column>

            <Grid.Column>
            <Header as='h2' inverted>
              <Icon name='search' />
              <Header.Content>
                10 viimeisintä hakua
              </Header.Content>
            </Header>
            <Container text>
              <LatestSearch/>
            </Container>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Frontpage;
