import React, { Component } from "react";
import ApiCalls from "../ApiCalls";
import config from '../config'
import PetInfo from '../Components/PetInfo'
import Context from '../Context'

export default class AdoptPage extends Component {

    state= {
        type : null,
        pets: {
            cat : null,
            dog: null,
        },
        people : [],
    }

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
    
    updatePets =(pets) => {
        this.setState({
          pets: pets
        })
    }


    render() {
        const value = {
            updatePets: this.updatePets,
        }
        const {people, pets, user, other} = this.state
    return (
        <Context.Provider value={value}>
        <div>
          <PetInfo pets={pets}/>  
        </div>
        </Context.Provider>
    );
  }
}