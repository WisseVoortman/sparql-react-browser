//import { CREATE_POST, EDIT_POST } from '../actionTypes'

export default function nodeReducer(state = [
  { id: 'A' },
  { id: 'B' },
  { id: 'C' },
  { id: 'D' },
  { id: 'E' },
  { id: 'F' },
  { id: 'G' },
  { id: 'H' },], action) {
  switch (action.type) {
    // case CREATE_POST: {
    //   const { type, ...post } = action
    //   return [...state, post]
    // }

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