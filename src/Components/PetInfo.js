import React, { Component } from "react";
import CatCard from './CatCard'
import DogCard from "./DogCard";

export default class PetInfo extends Component {


    render() {
        //Do a map here? Or in the component?
        const cats = this.props.pets.cat
        const dogs = this.props.pets.dog
    return (
        <div>
            <CatCard cats={cats}/>
            <DogCard dogs={dogs}/>
            {/* {cats.map((cat) => {
                return (
                    <div>
                        <p>{cat.name}</p>
                    </div>
                )
            })} */}
        </div>
    );
  }
}
