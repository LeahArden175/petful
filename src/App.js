import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import LandingPage from './MainPages/LandingPage'
import AdoptPage from './MainPages/AdoptPage'
import './App.css'

export default class App extends Component {
    render() {
    return (
        <div>
        <div className="container">
        <Link to ='/' className='header-link'>
        <h1 className="petful-header">Petful</h1>
        </Link>
        </div>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/adoption' component={AdoptPage} />
        </Switch>
      </div>
    );
  }
}
