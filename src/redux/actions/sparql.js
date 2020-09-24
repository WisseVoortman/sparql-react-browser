import { FETCH_SPARQL_REQUEST, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_FAILURE } from '../actionTypes'
import { thunkCreator } from './utils'

export const fetchSPARQL = (endpoint) => thunkCreator({
  types: [FETCH_SPARQL_REQUEST, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_FAILURE],
  promise: fetch({
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify('data') // body data type must match "Content-Type" header
  })
    .then(response => response.json())
})

// import {
//   SPARQL_GET_URI_FROM_LABEL_PENDING,
//   SPARQL_GET_URI_FROM_LABEL_FULFILLED,
//   SPARQL_GET_URI_FROM_LABEL_REJECTED,
//   SPARQL_GET_TRIPLES_FROM_URI
// } from '../actionTypes';

// import axios from 'axios';
// import store from '../store/index';
// import qs from 'qs';

// export const startSparqlGetUriFromLabel = () => ({
//   type: SPARQL_GET_URI_FROM_LABEL_PENDING,
// });

// export const fulfillSparqlGetUriFromLabel = (payload) => ({
//   type: SPARQL_GET_URI_FROM_LABEL_FULFILLED,
//   payload,
// });

// export const errorSparqlGetUriFromLabel = (payload) => ({
//   type: SPARQL_GET_URI_FROM_LABEL_REJECTED,
//   payload,
// });

// export const getTriplesFromUri = (uri, endpoint) => {
//   const query = 'SELECT * ' +
//     'WHERE { <' + uri + '> ?property ?object }' +
//     'limit 10';
//   return {
//     type: SPARQL_GET_TRIPLES_FROM_URI,
//     payload: sparqlAxios(query, endpoint),
//     meta: {
//       subject: uri,
//       endpoint,
//     },
//   };
// };

// export const getUrisFromLabel = (label) => (dispatch => {
//   dispatch(startSparqlGetUriFromLabel());
//   const query = 'SELECT ?subject ' +
//     'WHERE { ' +
//     '?subject <http://www.w3.org/2000/01/rdf-schema#label> "' + label + '"@nl' +
//     '} limit 10';

//   sparqlAxios(query, getCurrentEndpoint())
//     .then(payload => {
//       dispatch(fulfillSparqlGetUriFromLabel(payload));
//       payload.data.results.bindings.forEach(triple => {
//         dispatch(getTriplesFromUri(triple.subject.value,
//           getCurrentEndpoint()));
//       });
//     })
//     .catch(error => {
//       dispatch(errorSparqlGetUriFromLabel(error));
//     });
// });

// const getCurrentEndpoint = () => {
//   const state = store.getState();
//   const currentDatasource = state.connection.currentDatasource;
//   const endpoint = state.connection.datasources[currentDatasource].endpoint;
//   return endpoint;
// }

// const sparqlAxios = (query, endpoint) => (axios({
//   method: 'post',
//   url: endpoint,
//   data: qs.stringify({
//     action: 'exec',
//     queryLn: 'SPARQL',
//     ref: 'text',
//     query,
//   }),
//   headers: {
//     Accept: 'application/json',
//     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//   },
// }));