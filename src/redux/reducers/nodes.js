//import { CREATE_POST, EDIT_POST } from '../actionTypes'

export default function nodeReducer(state = [
  { name: 'A' },
  { name: 'B' },
  { name: 'C' },
  { name: 'D' },
  { name: 'E' },
  { name: 'F' },
  { name: 'G' },
  { name: 'H' },], action) {
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