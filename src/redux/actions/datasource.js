import { SET_CURRENT_DATASOURCE } from '../actionTypes'

export const setCurrentDatasource = (datasource) => {
  return {
    type: SET_CURRENT_DATASOURCE,
    datasource
  }
}
