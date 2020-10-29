import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ForceGraph from '../components/ForceGraph'
import ForceGraphOld from '../components/ForceGraphOld'

import { setSelectedNode, removeSelectedNode } from '../redux/actions/index'

const mapStateToProps = (state, props) => {
  return {
    nodes: state.nodes,
    links: state.links,
    data: state.data,
    history: state.router
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({
    setSelectedNode,
    removeSelectedNode,
  }, dispatch)

const ConnectedForceGraph = connect(mapStateToProps, mapDispatchToProps)(ForceGraph)

export default ConnectedForceGraph