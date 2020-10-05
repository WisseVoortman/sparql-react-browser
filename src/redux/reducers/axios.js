import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS } from '../actionTypes'

export default function testReducer(state = [
], action) {
  switch (action.type) {
    case FETCH_SPARQL_SUCCESS: {
      //return action.result.data

      // example of the type of object i want

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