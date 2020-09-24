import { FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE } from '../actionTypes'
import { thunkCreator } from './utils'

export const fetchTest = () => thunkCreator({
  types: [FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE],
  promise: fetch(`https://www.anapioficeandfire.com/api/books`)
    .then(response => response.json())
    .catch(error => { console.log(error) })

})

export const sparql = (endpoint) => thunkCreator({
  types: [FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE],
  promise: fetch('http://localhost:8080/rdf4j-workbench/repositories/1/query?query=SELECT+%3Fs+%3Fp+%3Fo+%0AWHERE+%0A%7B%0A++%3Fs+%3Fp+%3Fo+.+%0A++FILTER+(regex(%3Fo%2C+%22Verpleegkundige%22))%0A%7D')
    //.then(response => response.text())
    .catch(error => { console.log(error) })
})
