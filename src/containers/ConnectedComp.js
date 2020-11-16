import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Comp from '../components/Comp'

import { fetchClasses, toggleSearchAll } from '../redux/actions/index'

const mapStateToProps = (state, props) => {
  return {
    nodes: state.nodes,
    datasource: state.datasource,
    classes: state.classes
  }
}

const mapDispatchToProps = (dispatch, props, state) =>
  bindActionCreators({
    fetchClasses,
    toggleSearchAll,
  }, dispatch)

const ConnectedComp = connect(mapStateToProps, mapDispatchToProps)(Comp)

export default ConnectedComp