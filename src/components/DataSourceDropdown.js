import React from 'react';
import { Button, Dropdown } from 'react-bootstrap'

class DataSourceDropdown extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const renderDatasourceDropdown = () => {
      if (this.props.datasource.searchAll === 'Uit') {
        return (
          <Dropdown>
            <Dropdown.Toggle >Geselecteerde bron: {this.props.datasource.currentDatasource}</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.props.datasource.datasources.map((item, key) =>
                <Dropdown.Item key={key} onClick={() => this.props.setCurrentDatasource(item)}>
                  {item.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>)
      }
    }

    return (
      <div id="Datasource">
        <Button onClick={() => this.props.toggleSearchAll()}>Doorzoek alle bronnen: {this.props.datasource.searchAll}</Button>
        {renderDatasourceDropdown()}
      </div>
    )
  }
}

export default DataSourceDropdown
