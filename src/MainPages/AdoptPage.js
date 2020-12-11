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
        user : null,
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

    updatePeople = (people) => {
      this.setState({
        people
      })
    }

    joinList = (event) => {
      event.preventDefault()
      let people = this.state.people
      people.push(event.target.name.value)

      console.log('people', people)

      ApiCalls.addPerson({name: event.target.name.value})

      this.setState({
        people : people,
        user : event.target.name.value
      })
    }

    render() {
        const value = {
            updatePets: this.updatePets,
            updatePeople: this.updatePeople,
        }
        const {people, pets, user, other} = this.state
    return (
        <Context.Provider value={value}>
        <div>
          <PetInfo pets={pets} people={people}/>  
        </div>
        <div>
          <p>Join the back of the line to adopt!</p>
          <ul>
            {people.map((person, index) => {
              return (
                <li key={index}>{person}</li>
              )
            })}
          </ul>
          <form onSubmit={this.joinList}>
            <input id='name' placeholder="Jane Doe" required type='text'></input>
            <button>Join Line!</button>
          </form>
        </div>
        </Context.Provider>
    );
  }
}