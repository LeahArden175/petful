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
    user: {
      name: '',
    },
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
          })
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

  updatePeople = (person) => {
    console.log(person)
    this.setState({
      people: [...this.state.people, person]
    });
  };

  addPerson = (person) => {
    this.setState({
      people: person
    })
  }

  setPeople = (people) => {
    this.setState({
      people
    })
  }

  joinList = (event) => {
    event.preventDefault();
    let people = this.state.people;
    // if(this.state.people === null){
    //   this.fillPeopleQueue()
    // }

    ApiCalls.addPerson({ name: event.target.name.value });

    this.setState({
      people: [...people, event.target.name.value],
      user: {name: event.target.name.value},
    });

    this.interval = setInterval(() => {
      if(this.state.people === null || this.state.people[1] === this.state.user.name) {
        this.fillPeopleQueue();
      }
      if(this.state.people === null || this.state.people[0] === this.state.user.name) {
        //console.log('stop counter')
        return clearInterval(this.interval)
      }
      let pet
      if(this.state.adopting === true) {
        pet = {type : 'cats'}
      } else {
        pet = {type : 'dogs'}
      }
      ApiCalls.removePet(pet)
      .then(result => ApiCalls.removePerson())
      .then(result => ApiCalls.getPets()
        .then((pets) => {
          this.setState({
            adopting : !this.state.adopting
          })
          this.updatePets(pets)
        })
      )
      .then(result => ApiCalls.getAllPeople()
        .then((people) => {
          this.setState({people})
        })  
      )
    }, 5000)

    event.target.name.value = ''
  };

  fillPeopleQueue() {
    let names = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }]
    console.log(names)
    let count = 3;
    this.intervalID = setInterval(() => {
      if (count === -1) {
        return clearInterval(this.intervalID)
      }
      fetch(`${config.REACT_APP_API_BASE}/people`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(names[count--]),
      }).then((response) => {
        ApiCalls.getAllPeople()
        .then((response) => this.setPeople(response))
      });
    }, 5000);
  };

  renderPeopleQueue = () => {
    if(this.state.people){
      return this.state.people.map((person, index) => {
        return (
        <li key={index}>{person}</li>
        )
      })
    } else {
      return 'Loading'
    }
  }

  renderLineMessage = () => {
    if(this.state.user === null || this.state.people === null || this.state.user !== this.state.people[0]){
      return (
        <p>Join the back of the line to adopt!</p>
      )
    } else if(this.state.user === this.state.people[0]){
      return (
        <p>It's your turn to adopt</p>
      )
    } else {
      return;
    }
  }

  render() {

    const value = {
      updatePets: this.updatePets,
      updatePeople: this.updatePeople,
      setPeople: this.setPeople,
      user : this.state.user,
      people : this.state.people
    };
    const { people, pets } = this.state;

    return (
      <Context.Provider value={value}>
        <div>
          <PetInfo pets={pets} people={people} />
        </div>
        <div>
          {this.renderLineMessage()}
          <ul>

            {this.renderPeopleQueue()}
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
