import { SET_CURRENT_DATASOURCE, TOGGLE_SEARCHALL, TOGGLE_BLOCK_DATASOURCE, DELETE_DATASOURCE, ADD_DATASOURCE } from '../actionTypes'

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

export const toggleBlockDatasource = (datasource) => {
  return {
    type: TOGGLE_BLOCK_DATASOURCE,
    datasource
  }
}

export const deleteDatasource = (datasource) => {
  return {
    type: DELETE_DATASOURCE,
    datasource
  }
}

export const addDatasource = (name, endpoint) => {
  return {
    type: ADD_DATASOURCE,
    name,
    endpoint,
  }
}


