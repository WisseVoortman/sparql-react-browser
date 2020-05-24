import React from 'react';
import DataSourceDropdown from './DataSourceDropdown';
import SearchComponent from './SearchComponent';

const App = () => (
  <div>
    <div className="content">
      <DataSourceDropdown/>
      <SearchComponent/>
    </div>
  </div>
);

export default App;
