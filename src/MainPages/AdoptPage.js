import React, { Component } from "react";
import PetCard from "../Components/PetCard";
import PeopleQueue from "../Components/PeopleQueue";

export default function AdoptPage(props) {

    return (
      <div>
        <p>Adopt a pet!</p>
        <div>
            <p>Currently up for Adoption:</p>
            <div>
                <PetCard />
            </div>
            <div>
                <p>Rules</p>
                <p>You must join the queue to get the chance to adopt a pet</p>
                <p>We only allow one cat and one dog to be adopted at a time</p>
                <p>The person at the top of the queue has 5 seconds to choose which pet they would like to adopt</p>
            </div>
            <div>
                <p>Join the queue*** FORM HERE</p>
                <PeopleQueue queue={props.queue} adopt={props.adopt} />
            </div>
        </div>
      </div>
    );
}
