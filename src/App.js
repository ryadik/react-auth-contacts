import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import AuthPage from "./components/pages/auth-page/auth-page";
import ContactsPage from "./components/pages/contacts-page/contacts-page";
import getData from "./service/getData";

class App extends Component{

  state = {
    correctData: false,
    isLogin: false
  }

  conditionData = async (loginField, passwordField, e) => {
    e.preventDefault()

    const url = 'http://localhost:3002/users'

    await getData(url)
      .then(res => res.body)
      .then(body => {
        body.forEach(item => {
          if (loginField === item.login && passwordField === item.password) {
            this.setState({correctData: true, isLogin: true})
          } else {
            return false
          }
        })
      })
  }

  onLogout = () => {this.setState({isLogin: false})}

  render() {
    return (
      <div className="App container mx-auto px-3">
        <Router>
          <Switch>
            <Route exact path="/">
              <AuthPage conditionData={this.conditionData} isLogin={this.state.isLogin}/>
            </Route>
            <Route path="/cabinet">
              <ContactsPage isLogin={this.state.isLogin} onLogout={this.onLogout}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
