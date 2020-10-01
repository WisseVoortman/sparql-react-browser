import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Search from '../components/Search'
import { fetchTest, fetchSPARQL, sparql } from '../redux/actions/index'
import { push } from 'connected-react-router'


const mapStateToProps = (state, props) => {
  return {
    nodes: state.nodes,
    links: state.links,
    datasource: state.datasource,
    history: state.router

  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ fetchTest, fetchSPARQL, sparql, push }, dispatch)

const ConnectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search)

export default ConnectedSearch