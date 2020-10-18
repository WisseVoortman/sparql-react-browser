import { fetchAboutSubject } from '../actions';
import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_JSON_SUCCESS, FETCH_SPARQL_ABOUTSUBJECT_SUCCESS } from '../actionTypes'

export default function linkReducer(state = [
  { source: "Subject", target: "Object", property: "Property" },
], action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case FETCH_TEST_SUCCESS: {

      NewState = [
        { source: "Wisse", target: "DUO", property: "Is stagair bij" },
        { source: "Wisse", target: "Adres1", property: "Heeft Woonadres" },
        { source: "Adres1", target: "7913TH", property: "Postcode" },
        { source: "Adres1", target: "25", property: "Nummer" },
        { source: "Adres1", target: "Zuideropgaande", property: "Straatnaam" },
        { source: "Adres1", target: "Hollandscheveld", property: "Plaatsnaam" },
        { source: "DUO", target: "Adres2", property: "Heeft adres" },
        { source: "Adres2", target: "9722TB", property: "Postcode" },
        { source: "Adres2", target: "12", property: "Nummer" },
        { source: "Adres2", target: "Kempkensberg", property: "Straatnaam" },
        { source: "Adres2", target: "Groningen", property: "Plaatsnaam" },
        { source: "Wisse", target: "Adres2", property: "Werkadres" },
      ]

      //sort links by source then target --> sorteert goed.
      NewState.sort(function (a, b) {
        if (a.source > b.source) { return 1; }
        else if (a.source < b.source) { return -1; }
        else {
          if (a.target > b.target) { return 1; }
          if (a.target < b.target) { return -1; }
          else { return 0; }
        }
      })

      // set linknum for every link --> wordt in path gebruikt om duplicate links te kunnen leggen
      for (var i = 0; i < NewState.length; i++) {
        if (i != 0 &&
          NewState[i].source == NewState[i - 1].source &&
          NewState[i].target == NewState[i - 1].target) {
          NewState[i].linknum = NewState[i - 1].linknum + 1;
        }
        else { NewState[i].linknum = 1; };
      };
      return NewState
    }
    case FETCH_SPARQL_SUCCESS: {
      //LINK:
      //[{ source: "John", target: 'Fussbal', property: 'plays' }]

      //NODE
      //[{ id: 'John' }]

      NewState = []

      action.result.data.results.bindings.forEach(element => {
        //console.log(element)
        var source = element[action.result.data.head.vars[0]]
        var target = element[action.result.data.head.vars[2]]
        var property = element[action.result.data.head.vars[1]]
        var link = {}
        link.source = source.value
        link.target = target.value
        link.property = property.value
        NewState.push(link)

        //sort links by source then target --> sorteert goed.
        NewState.sort(function (a, b) {
          if (a.source > b.source) { return 1; }
          else if (a.source < b.source) { return -1; }
          else {
            if (a.target > b.target) { return 1; }
            if (a.target < b.target) { return -1; }
            else { return 0; }
          }
        })

        // set linknum for every link --> wordt in path gebruikt om duplicate links te kunnen leggen
        for (var i = 0; i < NewState.length; i++) {
          if (i != 0 &&
            NewState[i].source == NewState[i - 1].source &&
            NewState[i].target == NewState[i - 1].target) {
            NewState[i].linknum = NewState[i - 1].linknum + 1;
          }
          else { NewState[i].linknum = 1; };
        };


      });
      return NewState
    }
    case FETCH_SPARQL_ABOUTSUBJECT_SUCCESS: {
      //LINK:
      //[{ source: "John", target: 'Fussbal', property: 'plays' }]

      //NODE
      //[{ id: 'John' }]

      NewState = []

      var subjectURL = action.result.config.subject.split('/')
      //console.log(action.result.config.subject)
      //console.log(subjectURL[2])

      action.result.data.results.bindings.forEach(element => {
        var source = action.result.config.subject
        var target = element[action.result.data.head.vars[1]]
        var property = element[action.result.data.head.vars[0]]
        var link = {}
        link.source = source
        link.target = target.value
        link.property = property.value

        //console.log('test: ' + subjectURL[2])
        //console.log('link.property: ' + link.property)
        if (link.property.split('/')[2] == subjectURL[2]) {
          NewState.push(link)
        }



        //sort links by source then target --> sorteert goed.
        NewState.sort(function (a, b) {
          if (a.source > b.source) { return 1; }
          else if (a.source < b.source) { return -1; }
          else {
            if (a.target > b.target) { return 1; }
            if (a.target < b.target) { return -1; }
            else { return 0; }
          }
        })

        // set linknum for every link --> wordt in path gebruikt om duplicate links te kunnen leggen
        for (var i = 0; i < NewState.length; i++) {
          if (i != 0 &&
            NewState[i].source == NewState[i - 1].source &&
            NewState[i].target == NewState[i - 1].target) {
            NewState[i].linknum = NewState[i - 1].linknum + 1;
          }
          else { NewState[i].linknum = 1; };
        };


      });
      return NewState
    }
    default:
      return state
  }
}