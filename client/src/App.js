// eslint-disable-next-line
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from './page/Main';
import Login from './page/Login';
import Detail from './page/Detail';
import Myinfo from './page/Myinfo';
import Subject from './page/Subject';

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
          <Route exact path="/main/login" render={() => <Login />} />
          <Route exact path="/main/detail" render={() => <Detail />} />
          <Route exact path="/main/myinfo" render={() => <Myinfo />} />
          <Route exact path="/main/subject" render={() => <Subject />} />
          <Route exact path="/" render={() => <Main />} />
        </Switch>
      </div>
    );
  }
}
