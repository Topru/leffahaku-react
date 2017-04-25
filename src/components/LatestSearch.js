import React, { Component } from 'react';
import {Link} from 'react-router';
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
              <li key={i}><Link to={"movie/" + search.MovieID}>{search.Title}</Link></li>
            )}
          </ul>
      </div>
    );
  }
}

export default LatestSearch;
