import { FETCH_TEST_SUCCESS, FETCH_SPARQL_SUCCESS, FETCH_SPARQL_JSON_SUCCESS } from '../actionTypes'

export default function linkReducer(state = [
  { source: "John", target: "Voetbal", property: "Speelt" },
  { source: "Voetbal", target: "John", property: "Gespeeld door" },
  { source: "John", target: "Chip", property: "Heeft vriend" },
  { source: "Chip", target: "Voetbal", property: "Speelt" }
], action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case FETCH_TEST_SUCCESS: {

      NewState = [
        { source: "John", target: 'Fussbal', property: 'plays' },
        { source: "John", target: 'Fussbal', property: 'loves' },
        { source: "John", target: 'Chip', property: 'Heeft vriend' },
        { source: "Eric", target: 'Footbal', property: 'Speelt' },
        { source: "John", target: 'Golf', property: 'Speelt' },
        { source: "Eric", target: 'John', property: 'Heeft vriend' },
        { source: "Eric", target: 'Chip', property: 'Heeft vriend' }]

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
      //{ source: "John", target: 'Fussbal', property: 'plays' }

      //NODE
      //{ id: 'John' }
      var parseString = require('xml2js').parseString;
      var xml = action.result.data
      parseString(xml, function (err, result) {
        console.dir(result);
        NewState = []
        result.sparql.results[0].result.forEach(result => { //element is a single result.

          // 0 = p, 1 = s 2 = t
          var obj = {
            source: 'null',
            target: 'null',
            property: 'null',
            targetIsURI: 'null',
          }
          result.binding.forEach(binding => {

            switch (binding.$.name) {
              case 'subject':
                obj.source = binding.uri[0]
                console.log('source: ' + obj.source)
                break;
              case 'predicate':
                obj.property = binding.uri[0]._
                //console.log('property: ' + obj.property)
                break;
              case 'object':
                console.log(binding)

                if (binding.literal) {
                  console.log('literal')
                }
                if (binding.uri) {
                  console.log('uri')
                }

                break;
              default:
              // code block
            }

            if (obj.source == 'null') {
              obj.source = 'http://lod.onderwijsregistratie.nl/rio/id/Onderwijsbestuur/100B490'
            }


          })
          NewState.push(obj)
        });
      });


      return NewState
    }
    case FETCH_SPARQL_JSON_SUCCESS: {
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
    default:
      return state
  }
}