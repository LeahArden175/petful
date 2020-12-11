import React, { Component } from "react";
import ApiCalls from "../ApiCalls";
import PetInfo from '../Components/PetInfo'

export default class AdoptPage extends Component {

    state= {
        pets: {
            cat : null,
            dog: null,
        },
        people : [],
        user: sessionStorage.getItem("petful-user-name") || null,
        error: null
    }

    randomUsers = [
        "Leah A",
        "Nick D",
        "Alenni D",
        "Michael D",
        "Joy A"
    ];

    componentDidMount() {
        this.getData();
    }

    getData() {
        ApiCalls.getPets()
            .then((pets) => {
                ApiCalls.getAllPeople().then((people) => {
                    this.setState({
                        pets: pets,
                        people: people,
                    })
                    console.log(this.state)
                })
                .catch((error) => {
                    console.error(error)
                })
            })
    }    

    render() {
        const {people, pets, user, other} = this.state
    return (
        <div>
          <PetInfo pets={pets}/>  
        </div>
    );
  }
}