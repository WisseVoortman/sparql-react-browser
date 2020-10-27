import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import QueryForm from '../components/QueryForm'
import { fetchTest, fetchSparql, fetchAboutSubject } from '../redux/actions/index'
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
  bindActionCreators({ fetchTest, fetchSparql, fetchAboutSubject, push }, dispatch)

const ConnectedQueryForm = connect(mapStateToProps, mapDispatchToProps)(QueryForm)

export default ConnectedQueryForm