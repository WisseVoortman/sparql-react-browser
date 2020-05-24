import React from 'react';
import { Field, reduxForm } from 'redux-form';

const Search = props => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="currentSearch" component="input" type="text" />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
};

const SearchForm = reduxForm({
  form: 'search',
})(Search);


const SearchComponent = () => (
  <SearchForm onSubmit={ state => console.log(state)} />
)

export default SearchComponent;
