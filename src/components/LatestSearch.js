import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Image, Header, Accordion, Icon } from 'semantic-ui-react';

class LatestSearch extends Component {

  constructor(props) {
    super(props);
    var lastSearches = localStorage.getItem('searches');
    if(lastSearches === null){
      lastSearches = [];
    }
    else{
      lastSearches = JSON.parse(lastSearches);
    }
    this.state = {
      lastSearches
    }
  }

  render() {
    return (
      <div>
          <ul>
            {this.state.lastSearches.map((search, i) =>
              <li key={i}><a href={search.MovieID}>{search.Title}</a></li>
            )}
          </ul>
      </div>
    );
  }
}

export default LatestSearch;
