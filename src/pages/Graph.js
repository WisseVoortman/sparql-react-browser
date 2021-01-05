import React from 'react'

import {
  Route,
  Switch,
} from 'react-router-dom'

import { Nav, Row, Col, Tab, Tabs } from 'react-bootstrap'

import {
  NavLink,
} from 'react-router-dom'

import { Container } from 'react-bootstrap'


import ConnectedForceGraph from '../containers/ConnectedForceGraph';
import ConnectedDataSource from '../containers/ConnectedDataSource'
import ConnectedForceGraphSidebar from '../containers/ConnectedForceGraphSidebar'
import ForceGraphSidebar from '../components/ForceGraphSidebar'

class Graph extends React.Component {
  render() {
    console.log(this.props.match.path)
    return (
      <Container fluid id="PageContent">
      <div className="Graph">
        <h2>Graph</h2>
        <Row>
          <Col sm={4}>
          </Col>
          <Col>
            <ConnectedDataSource />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <ConnectedForceGraphSidebar></ConnectedForceGraphSidebar>
          </Col>
          <Col sm={8}><ConnectedForceGraph /></Col>
          </Row>

          
        
      </div>
      </Container>
      
    )
  }
}
export default Graph