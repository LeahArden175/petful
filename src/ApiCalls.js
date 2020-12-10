import config from './config'
const ApiCalls = {
//     getAllPeople() {
//         return fetch(`${process.env.API_ENDPOINT}/people`)
//         .then(res => (!res.ok)
//         ? res.json().then(e => Promise.reject(e))
//         : res.json()
//         )
//     },

//     postNewPerson(newPerson) {
//         return fetch(`${process.env.API_ENDPOINT}/people`, {
//             method : 'POST',
//             headers : {
//                 'content-type' : 'application.json'
//             },
//             body : JSON.stringify({newPerson: newPerson})
//         })
//         .then(res => (!res.ok)
//         ?res.json().then(e => Promise.reject(e))
//         : res.json()
//         )
//     },

//     removePerson(){
//         return fetch(`${process.env.API_ENDPOINT}/people`, {
//             method : 'DELETE',
//             headers : {
//                 'content-type' : 'application/json',
//             }
//         })
//         .then(res => (!res.ok)
//         ? res.json().then(e => Promise.reject(e))
//         : res.json()
//         )
//     },
//     getPets() {
//         return fetch(`${process.env.API_ENDPOINT}/pets`).then((res) =>
//           !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
//         );
//       },
    
//       removePet(petType) {
//           return fetch(`${process.env.API_ENDPOINT}/pets`, {
//               method : 'DELETE',
//               headers : {
//                   'content-type' : 'application/json'
//               },
//               body: JSON.stringify(petType)
//           })
//       }
// }

getPets() {
    return fetch(`${config.env.API_ENDPOINT}/pets`).then((res) => res.json());
  },

  getAllPeople() {
    return fetch(`${config.API_ENDPOINT}/people`).then((res) => res.json());
  },

  addPerson(person) {
    return fetch(`${config.env.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(person),
    })
  },

  removePerson() {
    return fetch(`${config.env.API_ENDPOINT}/people`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
  },

  removePet(pet) {
    return fetch(`${config.env.API_ENDPOINT}/pets/${pet}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    })
  },
};

export default ApiCalls;