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
      .then(() => this.context.user.name = null)
      .then(() => ApiCalls.getPets())
      .then((pets) => {
        this.context.updatePets(pets);
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
        <button className='adoptButton' id="cats" onClick={this.handleAdopt}>
          Adopt me!
        </button>
      );
    }
  };

  render() {
    if (!this.props.cats) {
      return "Loading cats...";
    }
    const cat = this.props.cats[0];

    return (
      <div>
        <div className='pet-card'>
          <h2 className="pet-name">{cat.name}</h2>
          <div className='img-div'>
          <img className='pet-img' src={cat.imageURL} alt="cat" />
          </div>
          <div className='pet-info-div'>
          <p className='pet-info-p'>Breed: {cat.breed}</p>
          <p className='pet-info-p'>Age: {cat.age}</p>
          <p className='pet-info-p'>Gender: {cat.gender}</p>
          <p className='pet-info-p'>Story: {cat.story}</p>
          <p className='pet-info-p'>Description: {cat.description}</p>
          </div>
          </div>
          {this.showAdoptButton()}
      </div>
    );
  }
}
