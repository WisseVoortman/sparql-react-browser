import React from 'react';

const Datasource = (props) => (
  <button className="dropdown-item" onClick={props.onClick}>
    {props.name}
  </button>
);

class DataSourceDropdown extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (

      <div className="setDataSourceDropdown">
        <div className="dropdown show">
          <button className="btn btn-secondary dropdown-toggle"
            id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">Specificeer bron: {this.props.datasource.currentDatasource.name}</button>
          <div className="" aria-labelledby="dropdownMenuLink">
            {
              this.props.datasource.datasources.map((item, key) =>
                <Datasource
                  key={key}
                  onClick={() => this.props.setCurrentDatasource(item)}
                  name={item.name}
                />
              )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default DataSourceDropdown
