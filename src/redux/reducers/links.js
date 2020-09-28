//import { CREATE_POST, EDIT_POST } from '../actionTypes'

export default function linkReducer(state = [
  { source: 'A', target: 'B', property: 'dirk' },
  { source: 'A', target: 'C', property: 'ryan' },
  //{ source: A, target: D },
  { source: 'B', target: 'G', property: 'wisse' },
  { source: 'D', target: 'E', property: 'bart' },
  { source: 'D', target: 'H', property: 'henk' },
  { source: 'E', target: 'F', property: 'john' },
  { source: 'E', target: 'H', property: 'test' }
], action) {
  switch (action.type) {
    //   case CREATE_POST: {
    //     const { type, ...post } = action
    //     return [...state, post]
    //   }

    //   case EDIT_POST: {
    //     const { type, id, ...newPost } = action
    //     return state.map((oldPost, index) =>
    //       action.id === index
    //         ? { ...oldPost, ...newPost }
    //         : oldPost
    //     )
    //   }

    default:
      return state
  }
}