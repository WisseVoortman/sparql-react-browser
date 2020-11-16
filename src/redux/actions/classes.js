import { FETCH_CLASSES_REQUEST, FETCH_CLASSES_SUCCESS, FETCH_CLASSES_FAILURE } from '../actionTypes'
import { thunkCreator } from './utils'
import qs from 'qs'
const axios = require('axios');

export const fetchClasses = (datasource) => thunkCreator({
  types: [FETCH_CLASSES_REQUEST, FETCH_CLASSES_SUCCESS, FETCH_CLASSES_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query: 'SELECT DISTINCT ?type WHERE {?s a ?type.}',
    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})
