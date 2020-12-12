import config from './config'
const ApiCalls = {
getPets() {
    return fetch(`${config.REACT_APP_API_BASE}/pets`).then((res) => res.json())
  },

  getAllPeople() {
    return fetch(`${config.REACT_APP_API_BASE}/people`).then((res) => res.json());
  },

  addPerson(person) {
    return fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(person),
    })
  },

  removePerson() {
    return fetch(`${config.REACT_APP_API_BASE}/people`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
  },

  removePet(pet) {
    return fetch(`${config.REACT_APP_API_BASE}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(pet)
    })
  },
};



export default ApiCalls;