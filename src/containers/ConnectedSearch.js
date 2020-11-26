import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Search from '../components/Search'

import { fetchClasses, fetchInstances, setSelectedClass, setSelectedInstance, fetchAboutSubject } from '../redux/actions/index'

const mapStateToProps = (state, props) => {
  return {
    nodes: state.nodes,
    datasource: state.datasource,
  }
}

const mapDispatchToProps = (dispatch, props, state) =>
  bindActionCreators({
    fetchClasses,
    fetchInstances,
    setSelectedClass,
    setSelectedInstance,
    fetchAboutSubject,
  }, dispatch)

const ConnectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search)

export default ConnectedSearch