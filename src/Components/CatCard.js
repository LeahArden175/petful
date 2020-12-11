import React, { Component } from "react";

export default class CatCard extends Component {
    render() {
    return (
        <div>
            <p>CatCard</p>
            {console.log(this.props)}
        </div>
    );
  }
}
