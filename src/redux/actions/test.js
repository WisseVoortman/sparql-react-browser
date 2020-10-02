import { FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE } from '../actionTypes'
import { thunkCreator } from './utils'

const axios = require('axios');

export const fetchTest = () => thunkCreator({
  types: [FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE],
  promise: fetch(`https://www.anapioficeandfire.com/api/books`)
    .then(response => response.json())
    .catch(error => { console.log(error) })

})

export const fetchAxios = () => thunkCreator({
  types: [FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE],
  promise: axios.get('http://localhost:8080/rdf4j-workbench/repositories/1/query?action=&queryLn=SPARQL&query=SELECT%20*%20%0AWHERE%20%0A%7B%0A%20%20%3Fs%20%3Fp%20%3Fo%20.%20%0A%20%20FILTER%20(regex(%3Fo%2C%20%229202LE%22))%0A%7D&limit_query=100&infer=true&')
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

export const sparql = (endpoint) => thunkCreator({
  types: [FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE],
  promise: fetch('http://localhost:8080/rdf4j-workbench/repositories/1/query?action=&queryLn=SPARQL&query=SELECT%20*%20%0AWHERE%20%0A%7B%0A%20%20%3Fs%20%3Fp%20%3Fo%20.%20%0A%20%20FILTER%20(regex(%3Fo%2C%20%229202LE%22))%0A%7D&limit_query=100&infer=true&')
    .then(response => console.log(response))
    .catch(error => { console.log(error) })
})
