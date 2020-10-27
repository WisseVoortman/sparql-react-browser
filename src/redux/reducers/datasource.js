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
      name: 'Basisregistratie adressen en gebouwen (alle voorkomens)',
      endpoint: 'https://bag.basisregistraties.overheid.nl/sparql',
    },
    {
      name: 'Basisregistratie adressen en gebouwen (nu geldige voorkomens)',
      endpoint: 'https://bag.basisregistraties.overheid.nl/sparql/now',
    },
    {
      name: 'Basisregistratie Kadaster - Digitale Kadastrale Kaart',
      endpoint: 'https://brk.basisregistraties.overheid.nl/sparql',
    },
    {
      name: 'Basisregitratie Topografie - Top10NL',
      endpoint: 'https://brt.basisregistraties.overheid.nl/sparql',
    },
    {
      name: 'Cultuurhistorische objecten',
      endpoint: 'https://linkeddata.cultureelerfgoed.nl/sparql',
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

