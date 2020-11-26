import React from 'react'

import {
  Route,
  Switch,
} from 'react-router-dom'

import { Nav } from 'react-bootstrap'

import {
  NavLink,
} from 'react-router-dom'


import ConnectedForceGraph from '../containers/ConnectedForceGraph';
import ConnectedQueryForm from '../containers/ConnectedQueryForm'
import ConnectedDataSource from '../containers/ConnectedDataSource'
import ConnectedExamples from '../containers/ConnectedExamples';
import ConnectedSearch from '../containers/ConnectedSearch';

class Graph extends React.Component {
  render() {
    console.log(this.props.match.path)
    return (
      <div className="Graph">
        <h2>Graph</h2>
        
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

        <ConnectedSearch />
        <ConnectedForceGraph />
      </div>
    )
  }
}
export default Graph