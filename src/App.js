import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import LandingPage from './MainPages/LandingPage'
import AdoptPage from './MainPages/AdoptPage'
import ApiCalls from "./ApiCalls";

export default class App extends Component {

    state = {
        queue: [],
        person: ''
    }

    setPerson = (person) => {
        this.setState({person})
    }

  render() {

     let queueList = {}
     
     if(this.state.queue[0] === this.state.person) {
         queueList = true;
     } else {
         queueList = false
     }

     ApiCalls.getAllPeople()
        .then((queue) => this.setState({queue}))


    return (
      <div>
        <div>
          <Link to="/">
            <h1>Petful</h1>
          </Link>
        </div>
        <Route 
            exact path='/' 
            render={
                () => <LandingPage setPerson={this.setPerson}/>
            } 
        />
        <Route path='/adoption' render={() => <AdoptPage adopt={queueList} queue={this.state.queue}/>} />
      </div>
    );
  }
}
