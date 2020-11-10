import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Gui from './YasguiClass'

class QueryForm extends React.Component {
  render() {
    return (
      <div>
        <div id="queryform">
          <Gui prop={1} action={this.props.fetchSparql} datasource={this.props.datasource.currentDatasource} />
        </div>
        <div id="querysubjectdetails form">
          <Gui prop={2} action={this.props.fetchAboutSubject} datasource={this.props.datasource.currentDatasource} />
        </div>
      </div >
    )
  }
}

export default QueryForm

