import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS } from '../actionTypes'

export default function nodeReducer(state = [
  { id: 'John' },
  { id: 'Chip' },
  { id: 'Voetbal' },
], action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case FETCH_TEST_SUCCESS: {

      var links = [
        { source: "John", target: 'Fussbal', property: 'plays' },
        { source: "John", target: 'Chip', property: 'Heeft vriend' },
        { source: "Eric", target: 'Footbal', property: 'Speelt' },
        { source: "John", target: 'Golf', property: 'Speelt' },
        { source: "Eric", target: 'John', property: 'Heeft vriend' },
        { source: "Eric", target: 'Chip', property: 'Heeft vriend' }]

      NewState = []

      //distinct nodes
      var templist = []
      links.forEach(link => {
        if (!templist.includes(link.source)) {
          NewState.push({ id: link.source })
        }
        if (!templist.includes(link.target)) {
          NewState.push({ id: link.target })
        }

        templist.push(link.source)
        templist.push(link.target)
      })

      return NewState
    }
    case FETCH_SPARQL_SUCCESS: {
      //LINK:
      //{ source: "John", target: 'Fussbal', property: 'plays' }

      //NODE
      //{ id: 'John' }
      // var parseString = require('xml2js').parseString;
      // var xml = action.result.data
      // parseString(xml, function (err, result) {
      //   console.dir(result);
      // });
      return 'ok dan'
    }
    default:
      return state
  }
}