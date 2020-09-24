import { connect } from 'react-redux'

import Error from '../components/Error'

const mapStateToProps = (state, props) => {
  return {
    message: state.error && state.error.message
  }
}

const ConnectedError = connect(mapStateToProps)(Error)

export default ConnectedError