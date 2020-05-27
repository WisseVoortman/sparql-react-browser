import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import { executeSparqlQuery } from '../actions/index';

const Search = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="searchQuery" component="input" type="text" />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
};

const SearchForm = reduxForm({
  form: 'search',
})(Search);


const SearchComponent = () => {
  const dispatch = useDispatch();

  return (<SearchForm onSubmit={ state => {
          dispatch(executeSparqlQuery(state.searchQuery));
        }
      } />);
};

export default SearchComponent;
