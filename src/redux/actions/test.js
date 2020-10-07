import { FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE } from '../actionTypes'
import { FETCH_SPARQL_REQUEST, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_FAILURE } from '../actionTypes'
import { FETCH_SPARQL_JSON_REQUEST, FETCH_SPARQL_JSON_SUCCESS, FETCH_SPARQL_JSON_FAILURE } from '../actionTypes'
import { thunkCreator } from './utils'
import qs from 'qs'

const axios = require('axios');

export const fetchTest = () => thunkCreator({
  types: [FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE],
  promise: fetch(`https://www.anapioficeandfire.com/api/books`)
    .then(response => response.json())
    .catch(error => { console.log(error) })

})

export const fetchAxiosGet = () => thunkCreator({
  types: [FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE],
  promise: axios.get('http://localhost:8080/rdf4j-workbench/repositories/1/query?action=&queryLn=SPARQL&query=SELECT%20%3Fsubject%20%3Fpredicate%20%3Fobject%0AWHERE%20%7B%0A%20%20%20%20%3Chttp%3A%2F%2Flod.onderwijsregistratie.nl%2Frio%2Fid%2FOnderwijsbestuur%2F100B490%3E%20%3Fpredicate%20%3Fobject%20.%0A%7D%20LIMIT%20100&limit_query=100&infer=true&Accept=application/sparql-results%2Bjson')
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

export const fetchAxiosPost = (query, datasource) => thunkCreator({
  types: [FETCH_SPARQL_JSON_REQUEST, FETCH_SPARQL_JSON_SUCCESS, FETCH_SPARQL_JSON_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query,
    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})

export const sparql = (endpoint) => thunkCreator({
  types: [FETCH_TEST_REQUEST, FETCH_TEST_SUCCESS, FETCH_TEST_FAILURE],
  promise: fetch('http://localhost:8080/rdf4j-workbench/repositories/1/query?action=&queryLn=SPARQL&query=SELECT%20*%20%0AWHERE%20%0A%7B%0A%20%20%3Fs%20%3Fp%20%3Fo%20.%20%0A%20%20FILTER%20(regex(%3Fo%2C%20%229202LE%22))%0A%7D&limit_query=100&infer=true&', {
    headers: {
      'Content-Type': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  //.then(response => console.log(response))
  // .catch(error => { console.log(error) })
})
