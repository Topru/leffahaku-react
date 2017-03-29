import React, { Component } from 'react';

import Search from './Search'

class Layout extends Component {

  render(){
    return (
      <div>
        {/* components you want to see in every route here*/}
        <Search/>


        {/*render specific route*/}
        {this.props.children}
      </div>
    )
  }
}

export default Layout;
