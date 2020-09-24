import { SET_CURRENT_DATASOURCE } from '../actionTypes';


export default function datasourceReducer(state = {
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
}, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_CURRENT_DATASOURCE: {
      newState.currentDatasource = action.datasource;
      return newState;
    }

    default:
      return state
  }
}

