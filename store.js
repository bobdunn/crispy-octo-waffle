const Client = require('node-rest-client').Client

const client = new Client()

let people = {list:[], byName:{}}
let peopleByFirstName = {}

const getPeople = async function(url='http://swapi.co/api/people/') {
  client.get(url, (data, response) => {
    for(const person of data.results){
      people.list.push(person)
      const firstName = person.name.split(' ')[0].toLowerCase()
      people.byName[firstName] = person
    }
    if(people.list.length < 50
        || !people.byName.luke
        || !people.byName.han
        || !people.byName.leia
        || !people.byName.rey
    ){
      getPeople(data.next)
    }
  })
}

getPeople()

module.exports = { people }
