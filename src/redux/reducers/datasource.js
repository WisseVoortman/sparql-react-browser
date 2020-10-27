import { SET_CURRENT_DATASOURCE, TOGGLE_SEARCHALL } from '../actionTypes';


export default function datasourceReducer(state = {
  searchAll: 'Uit',
  currentDatasource: 'https://lod.onderwijsregistratie.nl/rio/sparql',
  datasources: [
    {
      name: 'Onderwijsregistratie',
      endpoint: 'https://lod.onderwijsregistratie.nl/rio/sparql',
    },
    {
      name: 'dbpedia',
      endpoint: 'http://dbpedia.org/sparql',
    },
    {
      name: 'Onderwijsregistratie-localhost',
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
      console.log(action.datasource)
      newState.currentDatasource = action.datasource.endpoint;
      return newState;
    }
    case TOGGLE_SEARCHALL: {
      if (state.searchAll === 'Aan') {
        newState.searchAll = 'Uit'
      }
      if (state.searchAll === 'Uit') {
        newState.searchAll = 'Aan'
      }

      return newState
    }

    default:
      return state
  }
}

