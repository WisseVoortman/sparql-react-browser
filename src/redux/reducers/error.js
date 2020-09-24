export default function errorReducer(state = {}, action) {
  if (action.type.endsWith('_FAILURE')) {
    return action.error
  }
  // clear error whensubmitting another request
  if (action.type.endsWith('_REQUEST')) {
    return {}
  }

  return state
}