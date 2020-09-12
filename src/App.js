import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import AuthPage from "./components/pages/auth-page/auth-page";
import ContactsPage from "./components/pages/contacts-page/contacts-page";
import getData from "./service/getData";

class App extends Component{

  state = {
    correctData: false
  }

  conditionData = (loginField, passwordField, e) => {
    e.preventDefault()

    const url = 'http://localhost:3002/users'

    getData(url)
      .then(res => res.body)
      .then(body => {
        body.forEach(item => {
          if (loginField === item.login && passwordField === item.password) {
            this.setState({correctData: true})
          }
        })
      })
  }

  render() {
    return (
      <div className="App container mx-auto px-3">
        <Router>
          <Switch>
            <Route exact path="/">
              {this.state.correctData ? <Redirect to="/cabinet"/> : <AuthPage conditionData={this.conditionData}/>}
            </Route>
            <Route path="/cabinet" component={ContactsPage}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
