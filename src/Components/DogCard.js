import React, { Component } from "react";

export default class DogCard extends Component {
    render() {
        
    return (
        <div>
            <p>DogCard</p>
            {console.log(this.props)}
        </div>
    );
  }
}
