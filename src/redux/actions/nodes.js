import { SET_SELECTED_NODE, REMOVE_SELECTED_NODE } from '../actionTypes'

import { FETCH_ABOUT_CLICKED_NODE_REQUEST, FETCH_ABOUT_CLICKED_NODE_SUCCESS, FETCH_ABOUT_CLICKED_NODE_FAILURE } from '../actionTypes'

import { thunkCreator } from './utils'
import qs from 'qs'

const axios = require('axios');

export const setSelectedNode = (node) => {
  return {
    type: SET_SELECTED_NODE,
    node
  }
}

export const removeSelectedNode = (node) => {
  return {
    type: REMOVE_SELECTED_NODE,
  }
}

export const fetchAboutClickedNode = (subject, datasource) => thunkCreator({
  types: [FETCH_ABOUT_CLICKED_NODE_REQUEST, FETCH_ABOUT_CLICKED_NODE_SUCCESS, FETCH_ABOUT_CLICKED_NODE_FAILURE],
  promise: axios({
    method: 'post',
    url: datasource.currentDatasource,
    data: qs.stringify({
      action: 'exec',
      queryLn: 'SPARQL',
      ref: 'text',
      query: 'SELECT * ' + 'WHERE { <' + subject + '> ?property ?object }' + 'limit 200'
    }),
    headers: {
      Accept: 'application/sparql-results+json'
    },
    subject: subject

  })
  //  .then(response => console.log(response))
  // .catch(error => { console.log(error) })
})