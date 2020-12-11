import React, { Component } from "react";
import ApiCalls from "../ApiCalls";
import Context from "../Context";

export default class CatCard extends Component {
  static contextType = Context;

  handleAdopt = (event) => {
    event.preventDefault();
    console.log("clicked");
    const type = { type: event.target.id };
    ApiCalls.removePet(type)
      .then(() => ApiCalls.getPets())
      .then((pets) => {
        this.context.updatePets(pets);
      })
      .then(() => ApiCalls.removePerson(this.context.user))
      .then(() => ApiCalls.getAllPeople())
      .then((people) => {
        this.context.setPeople(people);
      });
  };

  showAdoptButton = () => {
    if (this.context.user && this.context.people && this.context.user === this.context.people[0]) {
      return (
        <button id="cats" onClick={this.handleAdopt}>
          Adopt me!
        </button>
      );
    }
  };

  render() {
    if (!this.props.cats) {
      return "Loading";
    }
    const cat = this.props.cats[0];

    return (
      <div>
        <div>
          <h2>CatCard</h2>
          <img src={cat.imageURL} alt="cat" />
          <p>{cat.name}</p>
          <p>{cat.breed}</p>
          <p>{cat.age}</p>
          <p>{cat.description}</p>
          {this.showAdoptButton()}
        </div>
      </div>
    );
  }
}
