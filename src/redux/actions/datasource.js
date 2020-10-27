import { SET_CURRENT_DATASOURCE, TOGGLE_SEARCHALL } from '../actionTypes'

export const setCurrentDatasource = (datasource) => {
  return {
    type: SET_CURRENT_DATASOURCE,
    datasource
  }
}

export const toggleSearchAll = () => {
  return {
    type: TOGGLE_SEARCHALL
  }
}
