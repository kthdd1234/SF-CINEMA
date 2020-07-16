// eslint-disable-next-line
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './page/Main/Main';
import Login from './page/Login/Login';
import Detail from './page/Detail/Detail';
import Myinfo from './page/Myinfo/Myinfo';
import Subject from './page/Subject/Subject';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/main" render={() => <Main />} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/detail" render={() => <Detail />} />
          <Route exact path="/myinfo" render={() => <Myinfo />} />
          <Route exact path="/subject" render={() => <Subject />} />
          <Route exact path="/" render={() => <Main />} />
        </Switch>
      </div>
    );
  }
}
