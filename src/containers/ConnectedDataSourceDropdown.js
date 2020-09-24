import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import DataSourceDropdown from '../components/DataSourceDropdown'
import { setCurrentDatasource } from '../redux/actions/index';


const mapStateToProps = (state, props) => {
  return {
    datasource: state.datasource

  }
}

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ setCurrentDatasource }, dispatch)

const ConnectedDataSourceDropdown = connect(mapStateToProps, mapDispatchToProps)(DataSourceDropdown)

export default ConnectedDataSourceDropdown