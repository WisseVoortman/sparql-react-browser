import { FETCH_CLASSES_SUCCESS } from '../actionTypes'

export default function classesReducer(state = [],
  action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case FETCH_CLASSES_SUCCESS: {
      return action.result.data.results.bindings
    }

    default:
      return state
  }
}