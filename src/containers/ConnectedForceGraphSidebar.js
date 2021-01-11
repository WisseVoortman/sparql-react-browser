import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ForceGraphSidebar from '../components/ForceGraphSidebar'
import { setSelectedNode, removeSelectedNode, fetchAboutClickedNode, fetchHistoryGraphs} from '../redux/actions/index'

const mapStateToProps = (state, props) => {
  return {
    datasource: state.datasource,
    nodes: state.nodes,
    links: state.links,
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ 
    setSelectedNode,
    removeSelectedNode,
    fetchAboutClickedNode,
    fetchHistoryGraphs,

  }, dispatch)

const ConnectedForceGraphSidebar = connect(mapStateToProps, mapDispatchToProps)(ForceGraphSidebar)

export default ConnectedForceGraphSidebar