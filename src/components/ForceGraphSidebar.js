import React from 'react'
import { isValidHttpUrl } from '../utils/index'

import { Tab, Tabs } from 'react-bootstrap'

import ConnectedQueryForm from '../containers/ConnectedQueryForm'
import ConnectedExamples from '../containers/ConnectedExamples';
import ConnectedSearch from '../containers/ConnectedSearch'
import ConnectedForcegraphSettings from '../containers/ConnectedForcegraphSettings'
import History from '../components/History'

class ForeGraphSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.fhg = this.props.fetchHistoryGraphs.bind(this)
  }
  render () {
    
    const renderNodesandLinksTab = (nodes, links) => {
      if (nodes.nodesList.length > 0 || links.length > 0) {
        return (
          <Tab eventKey="Nodes & links" title="Nodes & links">

        </Tab>
        )
      }
      else {
        return (
          null
        )
      }
    }

    const renderHistoryTab = (nodes) => {
      if (nodes.selectedNode !== "" && isValidHttpUrl(nodes.selectedNode.id)) {
        return (
          <Tab eventKey="History" title="History">
            <History selectedNode={this.props.nodes.selectedNode} datasource={this.props.datasource} fhg={this.fhg}></History>
          </Tab>

        )
      }
      else {
        return (
          null
        )
      }
    }

    return(
      <Tabs defaultActiveKey="Zoeken" id="uncontrolled-tab-example">
        <Tab eventKey="Zoeken" title="Zoeken">
          <ConnectedSearch></ConnectedSearch>
          <ConnectedQueryForm></ConnectedQueryForm>
        </Tab>
        <Tab eventKey="Instellingen" title="Instellingen">
          <ConnectedForcegraphSettings />
        </Tab>
        <Tab eventKey="Voorbeelden" title="Voorbeelden">
          <ConnectedExamples></ConnectedExamples>
        </Tab>
        {renderNodesandLinksTab(this.props.nodes, this.props.links)}
        {renderHistoryTab(this.props.nodes)}
      </Tabs>
    )
  }
}

export default ForeGraphSidebar