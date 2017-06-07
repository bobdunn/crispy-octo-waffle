const _ = require('lodash')
const Client = require('node-rest-client').Client

const client = new Client()

let people = {list:[], byName:{}}
let planetResidents = {}
const getPeopleThenPlanets = function(url='http://swapi.co/api/people/') {
  client.get(url, (data, response) => {
    for(const person of data.results){
      people.list.push(person)
      const firstName = person.name.split(' ')[0].toLowerCase()
      people.byName[firstName] = person
    }
    if(data.next
        && (people.list.length < 50
        || !people.byName.luke
        || !people.byName.han
        || !people.byName.leia
        || !people.byName.rey)
    ){
      getPeopleThenPlanets(data.next)
    } else {
      getPlanets()
    }
  })
}

const getPlanets = function(url='http://swapi.co/api/planets/') {
  client.get(url, (data, response) => {
    for(const planet of data.results){
      // console.log('Processing planet ', planet.name)
      // console.log(planet)
      planetResidents[planet.name] = _(people.list)
        .filter(p => { return p.homeworld === planet.url })
        .map(p => { return p.name })
    }
    if(data.next){
      getPlanets(data.next)
    }
  })
}

getPeopleThenPlanets()

module.exports = { people, planetResidents }
