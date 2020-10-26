// Root Reducer, combines all reducers into one single reducer

import { combineReducers } from 'redux'


// reducer for updating forcegraph based on meaningfull changes.
import dataReducer from './data'

//sparql endpoint data reducers
import nodesReducer from './nodes'
import linkesReducer from './links'


import datasourceReducer from './datasource'

//utility reducers
import loadingReducer from './loading'
import errorReducer from './error'

import { connectRouter } from 'connected-react-router'

const appReducer = (history) => combineReducers({
  data: dataReducer,
  nodes: nodesReducer,
  links: linkesReducer,
  datasource: datasourceReducer,
  loading: loadingReducer,
  error: errorReducer,
  router: connectRouter(history)
})

export default appReducer