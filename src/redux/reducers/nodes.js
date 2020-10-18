import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_JSON_SUCCESS } from '../actionTypes'

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
      console.log('node NewState: ' + NewState)
      return NewState
    }
    case FETCH_SPARQL_SUCCESS: {
      //LINK:
      //[{ source: "John", target: 'Fussbal', property: 'plays' }]

      //NODE
      //[{ id: 'John' }]

      NewState = []

      //distinct nodes
      var templist = []

      var vars = action.result.data.head.vars
      action.result.data.results.bindings.forEach(element => {

        //add subject and object to templist
        if (!templist.includes(element[vars[0]].value)) {
          NewState.push({ id: element[vars[0]].value, type: element[vars[0]].type })
        }
        if (!templist.includes(element[vars[2]].value)) {
          NewState.push({ id: element[vars[2]].value, type: element[vars[2]].type })
        }

        templist.push(element[vars[0]].value)
        templist.push(element[vars[2]].value)
      })
      return NewState
    }
    default:
      return state
  }
}