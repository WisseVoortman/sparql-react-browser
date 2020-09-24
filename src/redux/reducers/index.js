// Root Reducer, combines all reducers into one single reducer

import { combineReducers } from 'redux'

import nodesReducer from './nodes'
import linkesReducer from './links'
import datasourceReducer from './datasource'
import loadingReducer from './loading'
import errorReducer from './error'
import testReducer from './test'

import { connectRouter } from 'connected-react-router'

const appReducer = (history) => combineReducers({
  nodes: nodesReducer,
  links: linkesReducer,
  datasource: datasourceReducer,
  loading: loadingReducer,
  error: errorReducer,
  test: testReducer,
  router: connectRouter(history)
})

export default appReducer