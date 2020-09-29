import { FETCH_TEST_SUCCESS } from '../actionTypes'

export default function dataReducer(state = {
  links: [
    { source: "John", target: "Footbal", property: "plays" },
    { source: "John", target: "Chip", property: "Heeft vriend" },

  ],
  nodes: [
    { id: 'John' },
    { id: 'Chip' },
    { id: 'Footbal' },
  ]


}, action) {
  switch (action.type) {
    case FETCH_TEST_SUCCESS: {
      // new state to be returned
      const newstate = {
        links: [],
        nodes: []
      }

      //recieve new data from the fetch --> wordt goed gepakt door de reducer
      newstate.links = [
        { source: "John", target: 'Fussbal', property: 'plays' },
        { source: "John", target: 'Chip', property: 'Heeft vriend' },
        { source: "Eric", target: 'Footbal', property: 'Speelt' },
        { source: "John", target: 'Golf', property: 'Speelt' },
        { source: "Eric", target: 'John', property: 'Heeft vriend' },
        { source: "Eric", target: 'Chip', property: 'Heeft vriend' }]

      //sort links by source then target --> sorteert goed.
      newstate.links.sort(function (a, b) {
        if (a.source > b.source) { return 1; }
        else if (a.source < b.source) { return -1; }
        else {
          if (a.target > b.target) { return 1; }
          if (a.target < b.target) { return -1; }
          else { return 0; }
        }
      })

      console.log(newstate.links)

      // set linknum for every link --> wordt in path gebruikt om duplicate links te kunnen leggen
      for (var i = 0; i < newstate.links.length; i++) {
        if (i != 0 &&
          newstate.links[i].source == newstate.links[i - 1].source &&
          newstate.links[i].target == newstate.links[i - 1].target) {
          newstate.links[i].linknum = newstate.links[i - 1].linknum + 1;
        }
        else { newstate.links[i].linknum = 1; };
      };

      //distinct nodes
      var templist = []
      newstate.links.forEach(link => {
        if (!templist.includes(link.source)) {
          newstate.nodes.push({ id: link.source })
        }
        if (!templist.includes(link.target)) {
          newstate.nodes.push({ id: link.target })
        }

        templist.push(link.source)
        templist.push(link.target)
      })

      //{ id: 'A' }

      return Object.assign({}, newstate)
    }

    // case EDIT_POST: {
    //   const { type, id, ...newPost } = action
    //   return state.map((oldPost, index) =>
    //     action.id === index
    //       ? { ...oldPost, ...newPost }
    //       : oldPost
    //   )
    // }

    default:
      return state
  }
}