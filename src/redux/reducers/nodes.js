import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_JSON_SUCCESS, FETCH_SPARQL_ABOUTSUBJECT_SUCCESS } from '../actionTypes'

export default function nodeReducer(state = [
  { id: 'Subject', type: 'uri' },
  { id: 'Object', type: 'uri' },
], action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case FETCH_TEST_SUCCESS: {

      var links = [
        { source: { value: "Wisse", type: "uri" }, target: { value: "DUO", type: "uri" }, property: "Is stagair bij" },
        { source: { value: "Wisse", type: "uri" }, target: { value: "Adres1", type: "uri" }, property: "Heeft Woonadres" },
        { source: { value: "Adres1", type: "uri" }, target: { value: "7913TH", type: "literal" }, property: "Postcode" },
        { source: { value: "Adres1", type: "uri" }, target: { value: "25", type: "literal" }, property: "Nummer" },
        { source: { value: "Adres1", type: "uri" }, target: { value: "Zuideropgaande", type: "literal" }, property: "Straatnaam" },
        { source: { value: "Adres1", type: "uri" }, target: { value: "Hollandscheveld", type: "literal" }, property: "Plaatsnaam" },
        { source: { value: "DUO", type: "uri" }, target: { value: "Adres2", type: "uri" }, property: "Heeft adres" },
        { source: { value: "Adres2", type: "uri" }, target: { value: "9722TB", type: "literal" }, property: "Postcode" },
        { source: { value: "Adres2", type: "uri" }, target: { value: "12", type: "literal" }, property: "Nummer" },
        { source: { value: "Adres2", type: "uri" }, target: { value: "Kempkensberg", type: "literal" }, property: "Straatnaam" },
        { source: { value: "Adres2", type: "uri" }, target: { value: "Groningen", type: "literal" }, property: "Plaatsnaam" },
        { source: { value: "Wisse", type: "uri" }, target: { value: "Adres2", type: "uri" }, property: "Werkadres" },
      ]

      NewState = []

      //distinct nodes
      var templist = []
      links.forEach(link => {
        if (!templist.includes(link.source.value)) {
          NewState.push({ id: link.source.value, type: link.source.type })
        }
        if (!templist.includes(link.target.value)) {
          NewState.push({ id: link.target.value, type: link.target.type })
        }

        templist.push(link.source.value)
        templist.push(link.target.value)
      })
      console.log('node NewState: ' + NewState)
      return NewState
    }
    case FETCH_SPARQL_SUCCESS: {
      console.log(action.result.config.url)
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
    case FETCH_SPARQL_ABOUTSUBJECT_SUCCESS: {
      //LINK:
      //[{ source: "John", target: 'Fussbal', property: 'plays' }]

      //NODE
      //[{ id: 'John' }]

      NewState = []

      //distinct nodes
      var templist = []
      NewState.push({ id: action.result.config.subject })

      var vars = action.result.data.head.vars
      console.log(vars)
      action.result.data.results.bindings.forEach(element => {

        //add subject and object to templist
        if (!templist.includes(element[vars[1]].value)) {
          NewState.push({ id: element[vars[1]].value, type: element[vars[1]].type })
        }
        templist.push(element[vars[1]].value)
      })
      return NewState
    }
    default:
      return state
  }
}