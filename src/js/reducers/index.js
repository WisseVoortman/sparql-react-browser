import { SET_CURRENT_DATASOURCE, FETCH_SPARQL_REQUEST_PENDING,
 FETCH_SPARQL_REQUEST_FULFILLED,
FETCH_SPARQL_REQUEST_REJECTED } from '../constants/action-types';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const initialConnectionState = {
    currentDatasource: 0,
    datasources: [
      {
        name: 'Onderwijsregistratie',
        endpoint: 'http://localhost:8080/rdf4j-workbench/repositories/rio/query',
      },
      {
        name: 'Basisregistraties',
        endpoint: 'https://data.pdok.nl/sparql',
      },
      {
        name: 'Onderwijsinspectie',
        endpoint: 'http://localhost:8080/rdf4j-workbench/repositories/ivho/query',
      },
      {
        name: 'Kennisnet',
        endpoint: 'http://localhost:8080/rdf4j-workbench/repositories/kennisnet/query',
      },
    ],
  };

export const datasourceReducer = (state = initialConnectionState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_CURRENT_DATASOURCE:
      newState.currentDatasource = action.currentDatasource;
      return newState;
    default:
      return state;
  }
};

export const sparqlReducer = (state={}, action) => {
  switch (action.type) {
    case FETCH_SPARQL_REQUEST_PENDING:
      //newState.currentDatasource = action.currentDatasource;
      return { ...state, pending: true };
    case FETCH_SPARQL_REQUEST_FULFILLED:
      return { ...state, pending: false, data: action.payload };
    case FETCH_SPARQL_REQUEST_REJECTED:
      return { ...state, pending: false, error: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  connection: datasourceReducer,
  sparql: sparqlReducer,
  form: formReducer,
});


export default rootReducer;
