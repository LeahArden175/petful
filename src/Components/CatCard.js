import React, { Component } from "react";
import ApiCalls from "../ApiCalls";
import Context from "../Context";
import './CatCard.css'

export default class CatCard extends Component {
  static contextType = Context;

  handleAdopt = (event) => {
    event.preventDefault();
    //console.log(this.context);
    window.alert (
      "Congrats!! You adopted a cat!"
    )
    const type = { type: event.target.id };
    ApiCalls.removePet(type)
      .then(() => ApiCalls.getPets())
      .then((pets) => {
        this.context.updatePets(pets);
      })
      .then(() => ApiCalls.removePerson())
      .then(() => this.context.user === undefined)
      .then(() => ApiCalls.getAllPeople())
      .then((people) => {
        this.context.setPeople(people)
      })
      console.log('from cats', this.context.people)
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

    console.log('from cats', this.context.people)

    return (
      <div>
        <div className='pet-card'>
          <h2>CatCard</h2>
          <img className='pet-img' src={cat.imageURL} alt="cat" />
          <p>{cat.name}</p>
          <p>{cat.breed}</p>
          <p>{cat.age}</p>
          <p>{cat.description}</p>
          </div>
          {this.showAdoptButton()}
      </div>
    );
  }
}
