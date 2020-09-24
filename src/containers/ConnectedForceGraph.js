import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ForceGraph from '../components/ForceGraph'


const mapStateToProps = (state, props) => {
  return {
    nodes: state.nodes,
    links: state.links
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({}, dispatch)

const ConnectedForceGraph = connect(mapStateToProps, mapDispatchToProps)(ForceGraph)

export default ConnectedForceGraph