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
import ConnectedQueryForm from '../containers/ConnectedSearch'
import ConnectedDataSourceDropdown from '../containers/ConnectedDataSourceDropdown'
import ConnectedExamples from '../containers/ConnectedExamples';

class Graph extends React.Component {
  render() {
    console.log(this.props.match.path)
    return (
      <div className="Graph">
        <h2>Graph</h2>
        <Nav fill variant="tabs" defaultActiveKey="/examples">
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/sparql-react-browser/graph/examples">Examples</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/sparql-react-browser/graph/queryform">Query</Nav.Link>
          </Nav.Item>
        </Nav>

        <ConnectedDataSourceDropdown />

        <Switch>
          <Route exact path={`${this.props.match.path}/examples`} component={ConnectedExamples} />
          <Route exact path={`${this.props.match.path}/queryform`} component={ConnectedQueryForm} />
        </Switch>


        <ConnectedForceGraph />
      </div>
    )
  }
}
export default Graph