
import { SET_CURRENT_DATASOURCE,
  SPARQL_GET_URI_FROM_LABEL, SPARQL_GET_URI_FROM_LABEL_PENDING,
  SPARQL_GET_URI_FROM_LABEL_FULFILLED,
  SPARQL_GET_URI_FROM_LABEL_REJECTED
} from '../constants/action-types';
import axios from 'axios';
import store from '../store/index';
import qs from 'qs';

export const setCurrentDatasource = (currentDatasource) => ({
  type: SET_CURRENT_DATASOURCE,
  currentDatasource,
});

export const startSparqlGetUriFromLabel = () => ({
  type: SPARQL_GET_URI_FROM_LABEL_PENDING,
});

export const fulfillSparqlGetUriFromLabel = (payload) => ({
  type: SPARQL_GET_URI_FROM_LABEL_FULFILLED,
  payload,
});

export const errorSparqlGetUriFromLabel = (payload) => ({
  type: SPARQL_GET_URI_FROM_LABEL_FULFILLED,
  payload,
});

export const getUrisFromLabel = (label) => (dispatch => {
    dispatch(startSparqlGetUriFromLabel());
    var query = 'SELECT ?subject WHERE {?subject <http://www.w3.org/2000/01/rdf-'
      + 'schema#label> "' + label + '"@nl} limit 10';
    const state = store.getState();
    const currentDatasource = state.connection.currentDatasource;
    const endpoint = state.connection.datasources[currentDatasource].endpoint;
    sparqlAxios(query, endpoint)
      .then(result => {
          dispatch(fulfillSparqlGetUriFromLabel(result));
      })
      .catch(error => {
        dispatch(errorSparqlGetUriFromLabel(error));
      });
  });

const sparqlAxios = (query, endpoint) => (axios({
  method: 'post',
  url: endpoint,
  data: qs.stringify({
    action: 'exec',
    queryLn: 'SPARQL',
    ref: 'text',
    query,
  }),
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
}));
