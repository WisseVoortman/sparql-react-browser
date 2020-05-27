
import { SET_CURRENT_DATASOURCE,
  FETCH_SPARQL_REQUEST
} from '../constants/action-types';
import axios from 'axios';
import store from '../store/index';
import qs from 'qs';

export const setCurrentDatasource = (currentDatasource) => ({
  type: SET_CURRENT_DATASOURCE,
  currentDatasource,
});

export const getUrisFromLabel = (label) => {
  var query = 'SELECT ?subject WHERE {?subject <http://www.w3.org/2000/01/rdf-'
    + 'schema#label> "' + label + '"@nl} limit 10';
  const state = store.getState();
  const currentDatasource = state.connection.currentDatasource;
  const endpoint = state.connection.datasources[currentDatasource].endpoint;
  return {
    type: FETCH_SPARQL_REQUEST,
    payload: sparqlAxios(query, endpoint),
  };
};

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
