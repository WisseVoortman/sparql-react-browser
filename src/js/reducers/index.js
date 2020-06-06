import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import sparqlReducer from './sparqlReducer';
import datasourceReducer from './datasourceReducer';

const reducersCombined = {
  connection: datasourceReducer,
  sparql: sparqlReducer,
  form: formReducer,
};

const rootReducer = combineReducers(reducersCombined);
export default rootReducer;
