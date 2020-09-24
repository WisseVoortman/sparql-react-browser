//import { CREATE_POST, EDIT_POST } from '../actionTypes'

export default function linkReducer(state = [
  { source: 0, target: 1, property: 'dirk' },
  { source: 0, target: 2, property: 'ryan' },
  //{ source: 0, target: 3 },
  { source: 1, target: 6, property: 'wisse' },
  { source: 3, target: 4, property: 'bart' },
  { source: 3, target: 7, property: 'henk' },
  { source: 4, target: 5, property: 'john' },
  { source: 4, target: 7, property: 'test' }
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