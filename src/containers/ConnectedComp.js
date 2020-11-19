import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Comp from '../components/Comp'

import { fetchClasses, fetchInstances, setSelectedClass, setSelectedInstance } from '../redux/actions/index'

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
  }, dispatch)

const ConnectedComp = connect(mapStateToProps, mapDispatchToProps)(Comp)

export default ConnectedComp