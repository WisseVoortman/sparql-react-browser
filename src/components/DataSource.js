import React from 'react';
import { ButtonGroup, Button, Dropdown, Row, Col } from 'react-bootstrap'

import ConnectedAddDatasource from '../containers/ConnectedAddDatasource'

class DataSourceDropdown extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const renderBlockButton = (item) => {
      if (item.active) {
        return (
          <Button onClick={() => this.props.toggleBlockDatasource(item)}>Block </Button>
        )
      }
      else {
        return (
          <Button onClick={() => this.props.toggleBlockDatasource(item)}>Unblock </Button>
        )
      }
    }

    const renderDatasourceDropdown = () => {
      if (this.props.datasource.searchAll === 'Uit') {
        return (
          <Dropdown>
            <Dropdown.Toggle >Geselecteerde bron: {this.props.datasource.currentDatasource}</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.props.datasource.datasources.map((item, key) =>
                <Dropdown.Item key={key} >
                  <Row>
                    <Col>
                      <div onClick={() => this.props.setCurrentDatasource(item)}>{item.name}</div>
                    </Col>
                    <Col>
                      <ButtonGroup className="float-right">

                        {renderBlockButton(item)}
                        <Button onClick={() => this.props.deleteDatasource(item)}>Remove</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </Dropdown.Item>
              )}
              {<ConnectedAddDatasource />}
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
