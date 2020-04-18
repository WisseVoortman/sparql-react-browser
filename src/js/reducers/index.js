import {SET_CURRENT_DATASOURCE} from "../constants/action-types";

const initialState = {
  connection: {
    currentDatasource: 0,
    datasources: [
      {
        name: 'Onderwijsregistratie',
        endpoint: 'http://localhost:8080/rdf4j-workbench/repositories/rio/query'
      },
      {
        name: 'Basisregistraties',
        endpoint: 'https://data.pdok.nl/sparql'
      },
      {
        name: 'Onderwijsinspectie',
        endpoint: 'http://localhost:8080/rdf4j-workbench/repositories/ivho/query'
      },
      {
        name: 'Kennisnet',
        endpoint: 'http://localhost:8080/rdf4j-workbench/repositories/kennisnet/query'
      }
    ]
  }
}

function rootReducer(state = initialState, action) {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case SET_CURRENT_DATASOURCE:
      newState.connection.currentDatasource = action.currentDatasource;
      return newState;
    default:
      return state;
  }
}

export default rootReducer;
