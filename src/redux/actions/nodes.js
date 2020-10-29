import { SET_SELECTED_NODE, REMOVE_SELECTED_NODE } from '../actionTypes'

export const setSelectedNode = (node) => {
  return {
    type: SET_SELECTED_NODE,
    node
  }
}

export const removeSelectedNode = (node) => {
  return {
    type: REMOVE_SELECTED_NODE,
  }
}