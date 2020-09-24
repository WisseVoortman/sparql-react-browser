import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Search from '../components/Search'
import { fetchTest, fetchSPARQL, sparql } from '../redux/actions/index'


const mapStateToProps = (state, props) => {
  return {
    nodes: state.nodes,
    links: state.links,
    datasource: state.datasource

  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ fetchTest, fetchSPARQL, sparql, }, dispatch)

const ConnectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search)

export default ConnectedSearch