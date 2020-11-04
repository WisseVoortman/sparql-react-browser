import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import D3NodeGenerator from '../components/D3NodeGenerator'

import { setSelectedNode, removeSelectedNode, fetchAboutClickedNode } from '../redux/actions/index';

const mapStateToProps = (state, props) => {
  return {
    datasource: state.datasource,
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({
    setSelectedNode,
    removeSelectedNode,
    fetchAboutClickedNode,
  }, dispatch)

const ConnectedD3NodeGenerator = connect(mapStateToProps, mapDispatchToProps)(D3NodeGenerator)

export default ConnectedD3NodeGenerator

//set d3nodegenerator in forcegraph to use the props from the connected compoent