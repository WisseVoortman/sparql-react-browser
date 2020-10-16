import React from 'react';
import { Dropdown } from 'react-bootstrap'

class DataSourceDropdown extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div id="datasourceDropdown">
        <Dropdown>
          <Dropdown.Toggle >
            Geselecteerde bron: {this.props.datasource.currentDatasource}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {this.props.datasource.datasources.map((item, key) =>
              <Dropdown.Item key={key} onClick={() => this.props.setCurrentDatasource(item)}>
                {item.name}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    )
  }
}

export default DataSourceDropdown
