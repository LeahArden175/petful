import config from './config'
const ApiCalls = {
getPets() {
    return fetch(`${config.API_ENDPOINT}/pets`).then((res) => res.json())
  },

  getAllPeople() {
    return fetch(`${config.API_ENDPOINT}/people`).then((res) => res.json());
  },

  addPerson(person) {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(person),
    })
  },

  removePerson() {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
  },

  removePet(pet) {
    return fetch(`${config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(pet)
    })
  },
};



export default ApiCalls;