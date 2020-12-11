import React, { Component } from "react";
import CatCard from './CatCard'
import DogCard from "./DogCard";

export default class PetInfo extends Component {


    render() {
        const cats = this.props.pets.cat
        const dogs = this.props.pets.dog
    return (
        <div>
            <p>PetInfo</p>
            {console.log(this.props.pets.cat)}
            <CatCard cats={cats}/>
            <DogCard dogs={dogs}/>
        </div>
    );
  }
}
