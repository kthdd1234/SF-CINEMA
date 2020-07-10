import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';

// eslint-disable-next-line
export default class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <Body />
      </div>
    );
  }
}
