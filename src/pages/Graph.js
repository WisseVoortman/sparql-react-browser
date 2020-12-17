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
        <Container>
        <Nav fill variant="tabs" defaultActiveKey="/sparql-react-browser/graph/examples">
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/sparql-react-browser/graph/examples">Voorbeelden</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/sparql-react-browser/graph/queryform">Queryform</Nav.Link>
          </Nav.Item>
        </Nav>

        <Switch>
          <Route exact path={`${this.props.match.path}/examples`} component={ConnectedExamples} />
          <Route exact path={`${this.props.match.path}/queryform`} component={ConnectedQueryForm} />
        </Switch>
        </Container>


        <ConnectedForceGraph />
      </div>
      </Container>
    )
  }
}
export default Graph