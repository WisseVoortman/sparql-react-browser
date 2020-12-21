import React from 'react'

import {
  Route,
  Switch,
} from 'react-router-dom'

import { Nav } from 'react-bootstrap'

import {
  NavLink,
} from 'react-router-dom'

import { Container } from 'react-bootstrap'


import ConnectedForceGraph from '../containers/ConnectedForceGraph';
import ConnectedQueryForm from '../containers/ConnectedQueryForm'
import ConnectedDataSource from '../containers/ConnectedDataSource'
import ConnectedExamples from '../containers/ConnectedExamples';

class Graph extends React.Component {
  render() {
    console.log(this.props.match.path)
    return (
      <Container fluid id="PageContent">
      <div className="Graph">
        <h2>Graph</h2>
        <ConnectedForceGraph />
      </div>
      </Container>
    )
  }
}
export default Graph