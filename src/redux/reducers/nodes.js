import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_ABOUTSUBJECT_SUCCESS } from '../actionTypes'

export default function nodeReducer(state = [
  { id: 'Subject', type: 'literal' },
  { id: 'Object', type: 'literal' },
], action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case FETCH_TEST_SUCCESS: {

      var links = [
        { source: { value: "http://example.nl/persoon/Wisse", type: "uri" }, target: { value: "http://example.nl/bedrijf/DUO", type: "uri" }, property: "Is stagair bij" },
        { source: { value: "http://example.nl/persoon/Wisse", type: "uri" }, target: { value: "http://example.nl/adres/Adres1", type: "uri" }, property: "Heeft Woonadres" },
        { source: { value: "http://example.nl/adres/Adres1", type: "uri" }, target: { value: "7913TH", type: "literal" }, property: "Postcode" },
        { source: { value: "http://example.nl/adres/Adres1", type: "uri" }, target: { value: "25", type: "literal" }, property: "Nummer" },
        { source: { value: "http://example.nl/adres/Adres1", type: "uri" }, target: { value: "Zuideropgaande", type: "literal" }, property: "Straatnaam" },
        { source: { value: "http://example.nl/adres/Adres1", type: "uri" }, target: { value: "Hollandscheveld", type: "literal" }, property: "Plaatsnaam" },
        { source: { value: "http://example.nl/bedrijf/DUO", type: "uri" }, target: { value: "http://example.nl/adres/Adres2", type: "uri" }, property: "Heeft adres" },
        { source: { value: "http://example.nl/adres/Adres2", type: "uri" }, target: { value: "9722TB", type: "literal" }, property: "Postcode" },
        { source: { value: "http://example.nl/adres/Adres2", type: "uri" }, target: { value: "12", type: "literal" }, property: "Nummer" },
        { source: { value: "http://example.nl/adres/Adres2", type: "uri" }, target: { value: "Kempkensberg", type: "literal" }, property: "Straatnaam" },
        { source: { value: "http://example.nl/adres/Adres2", type: "uri" }, target: { value: "Groningen", type: "literal" }, property: "Plaatsnaam" },
        { source: { value: "http://example.nl/persoon/Wisse", type: "uri" }, target: { value: "http://example.nl/adres/Adres2", type: "uri" }, property: "Werkadres" },
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

      //add subject
      var urlParams = action.result.config.subject.split('/')
      urlParams.splice(0, 3)
      urlParams = urlParams.join('/')
      console.log('urlParam: ' + urlParams)

      NewState.push({ id: action.result.config.subject, type: 'uri' })

      var vars = action.result.data.head.vars
      // console.log(vars)

      // console.log('longurl' + action.result.config.subject)
      var subjectURL = action.result.config.subject.split('/')
      // console.log('shorturl ' + subjectURL[2])

      action.result.data.results.bindings.forEach(element => {

        //check if property comes from specific url to filter bad nodes
        var subjectURL = action.result.config.subject.split('/')
        if (element[vars[0]].value.split('/')[2] === subjectURL[2]) {
          //add object
          if (!templist.includes(element[vars[1]].value)) {
            if (element[vars[1]].type === 'uri') {
              var objParam = element[action.result.data.head.vars[1]].value.split('/')
              objParam.splice(0, 3)
              objParam = objParam.join('/')
              console.log('objParam: ' + objParam)
              NewState.push({ id: element[action.result.data.head.vars[1]].value, type: element[vars[1]].type })
            }
            else {
              NewState.push({ id: element[vars[1]].value, type: element[vars[1]].type })
            }

          }
          templist.push(element[vars[1]].value)
        }
      })
      return NewState
    }
    default:
      return state
  }
}