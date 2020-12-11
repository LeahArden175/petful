import React, { Component } from "react";
import ApiCalls from "../ApiCalls";
import config from "../config";
import PetInfo from "../Components/PetInfo";
import Context from "../Context";

export default class AdoptPage extends Component {
  state = {
    pets: {
      cat: null,
      dog: null,
    },
    people: [],
    user: null,
    adopting : true,
  };

  componentDidMount() {
    this.getData();
  }

  getData() {
    ApiCalls.getPets().then((pets) => {
      ApiCalls.getAllPeople()
        .then((people) => {
          this.setState({
            pets: pets,
            people: people,
          });
          console.log(this.state);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  updatePets = (pets) => {
    this.setState({
      pets: pets,
    });
  };

  updatePeople = (people) => {
    this.setState({
      people,
    });
  };

  joinList = (event) => {
    event.preventDefault();
    let people = this.state.people;
    people.push(event.target.name.value);

    console.log("people", people);

    ApiCalls.addPerson({ name: event.target.name.value });

    this.setState({
      people: people,
      user: event.target.name.value,
    });

    let interval = setInterval(() => {
      let pet
      if(this.state.adopting === true) {
        pet = {type : 'cats'}
      } else {
        pet = {type : 'dogs'}
      }
      ApiCalls.removePet(pet)
      .then(ApiCalls.getPets()
        .then((pets) => {
          this.updatePets(pets)
        })
      )
      .then(ApiCalls.getAllPeople()
        .then((people) => {
          this.updatePeople(people)
        })  
      )

        this.setState({
          animal : !this.state.animal
        })

        if(this.state.people[1] === this.state.currentUser) {
          clearInterval(interval)
        }
    }, 5000)

    event.target.name.value = ''
  };

  fillPeopleQueue() {
    let names = [{ Name: 'Malcolm Reynolds' }, { Name: 'River Tam' }, { Name: 'Kaylee Frye' }, { Name: 'Hoban Washburne' }]
    let count = 3;
    this.state.people.push(names[count].Name);
    let intervalID = setInterval(function () {
      fetch(`${config.API_ENDPOINT}/people`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(names[count--]),
      }).then(() => {
        this.updatePeople()
      });
      if (count === -1) {
        clearInterval(intervalID)
      }
    }, 5000);
  };

  render() {
    const value = {
      updatePets: this.updatePets,
      updatePeople: this.updatePeople,
    };
    const { people, pets, user, other } = this.state;

    if(people[0] === this.state.currentUser && people.length === 1){
      this.fillTheQueue();
    }

    return (
      <Context.Provider value={value}>
        <div>
          <PetInfo pets={pets} people={people} />
        </div>
        <div>
          <p>Join the back of the line to adopt!</p>
          <ul>
            {people.map((person, index) => {
              return <li key={index}>{person}</li>;
            })}
          </ul>
          <form onSubmit={this.joinList}>
            <input
              id="name"
              placeholder="Jane Doe"
              required
              type="text"
            ></input>
            <button>Join Line!</button>
          </form>
        </div>
      </Context.Provider>
    );
  }
}
