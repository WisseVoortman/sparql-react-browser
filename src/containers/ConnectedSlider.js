import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Slider from '../components/Slider'

import { setForcegraphSettings } from '../redux/actions/forcegraphSettings'

const mapStateToProps = (state, props) => {
  return {
    settings: state.forcegraphsettings
  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({
    setForcegraphSettings,
  }, dispatch)

const ConnectedSlider = connect(mapStateToProps, mapDispatchToProps)(Slider)

export default ConnectedSlider