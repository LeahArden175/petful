import React, { Component } from "react";
import CatCard from './CatCard'
import DogCard from "./DogCard";

export default class PetInfo extends Component {


    render() {
        //Do a map here? Or in the component?
        const cats = this.props.pets.cat
        const dogs = this.props.pets.dog
        const people = this.props.people
    return (
        <div>
            <CatCard cats={cats} people={people}/>
            <DogCard dogs={dogs}/>
        </div>
    );
  }
}
