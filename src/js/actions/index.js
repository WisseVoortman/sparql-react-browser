
import { SET_CURRENT_DATASOURCE, FETCH_SPARQL_REQUEST } from '../constants/action-types';
import axios from 'axios';
import store from '../store/index';

export const setCurrentDatasource = (currentDatasource) => ({
  type: SET_CURRENT_DATASOURCE,
  currentDatasource,
});

export const executeSparqlQuery = (searchQuery) => {
  const state = store.getState();
  const currentDatasource = state.connection.currentDatasource;
  const endpoint = state.connection.datasources[currentDatasource].endpoint;
  return {
    type: FETCH_SPARQL_REQUEST,
    payload: axios.get(endpoint),
  };
};
