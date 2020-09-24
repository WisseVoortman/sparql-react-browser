import React from 'react'

import ConnectedForceGraph from '../containers/ConnectedForceGraph';
import ConnectedSearch from '../containers/ConnectedSearch'
import ConnectedDataSourceDropdown from '../containers/ConnectedDataSourceDropdown'

class Graph extends React.Component {
  render() {
    return (
      <div className="Graph">
        <h2>Graph</h2>
        <ConnectedSearch />
        <ConnectedDataSourceDropdown />
        <ConnectedForceGraph />
      </div>
    )
  }
}
export default Graph