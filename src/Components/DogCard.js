import React, { Component } from "react";
import ApiCalls from "../ApiCalls";
import Context from "../Context";

export default class DogCard extends Component {
  static contextType = Context;

  handleAdopt = (event) => {
    event.preventDefault();
    console.log("clicked");
    const type = { type: event.target.id };
    ApiCalls.removePet(type)
    .then(() => ApiCalls.getPets())
    .then((pets) => {
      this.context.updatePets(pets)
    })
    .then(() => ApiCalls.removePerson(this.context.user))
    .then(() => ApiCalls.getAllPeople())
    .then((people) => {
      this.context.setPeople(people)
    })
  };

  showAdoptButton = () => {
    if (this.context.user && this.context.people && this.context.user === this.context.people[0]) {
      return (
        <button id="dogs" onClick={this.handleAdopt}>
          Adopt me!
        </button>
      );
    }
  };

  render() {
    // console.log(this.props);
    // console.log(this.context);
    if (!this.props.dogs) {
      return "Loading";
    }

    const dog = this.props.dogs[0];

    return (
      <div>
        <div>
          <h2>DogCard</h2>
          <img src={dog.imageURL} alt="dog" />
          <p>{dog.name}</p>
          <p>{dog.breed}</p>
          <p>{dog.age}</p>
          <p>{dog.description}</p>
        </div>
        {this.showAdoptButton()}
      </div>
    );
  }
}
