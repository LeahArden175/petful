import React, { Component } from "react";
import ApiCalls from "../ApiCalls";
import Context from "../Context";
import './DogCard.css'

export default class DogCard extends Component {
  static contextType = Context;

  handleAdopt = (event) => {
    event.preventDefault();
    //console.log("clicked");
    window.alert (
      "Congrats!! You adopted a dog!"
    )
    const type = { type: event.target.id };
    ApiCalls.removePet(type)
    .then(() => ApiCalls.getPets())
    .then((pets) => {
      this.context.updatePets(pets)
    })
    .then(() => ApiCalls.removePerson())
    .then(() => ApiCalls.getAllPeople())
    .then((people) => {
      this.context.setPeople(people)
    })
  };

  showAdoptButton = () => {
    if (this.context.user.name && this.context.people && this.context.user.name === this.context.people[0]) {
      return (
        <button className='adoptButton' id="dogs" onClick={this.handleAdopt}>
          Adopt me!
        </button>
      );
    }
  };

  render() {
    if (!this.props.dogs) {
      return "Loading";
    }

    const dog = this.props.dogs[0];

    return (
      <div>
        <div className='pet-card'>
          <h2 className="pet-name">{dog.name}</h2>
          <img className='pet-img'src={dog.imageURL} alt="dog" />
          <div className='pet-info-div'>
          <p className='pet-info-p'>Breed: {dog.breed}</p>
          <p className='pet-info-p'>Age: {dog.age}</p>
          <p className='pet-info-p'>Gender: {dog.gender}</p>
          <p className='pet-info-p'>Story: {dog.story}</p>
          <p className='pet-info-p'>Description: {dog.description}</p>
          </div>
        </div>
        {this.showAdoptButton()}
      </div>
    );
  }
}
