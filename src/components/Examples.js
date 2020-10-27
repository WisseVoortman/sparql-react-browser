import React from 'react'
import Button from 'react-bootstrap/Button'

class Example extends React.Component {
  constructor(props) {
    super();
    this.state = {
      query: "SELECT * WHERE" + "{" + "?sub ?pred ?obj ." + "}" + "LIMIT 10",
      subject: "http://lod.onderwijsregistratie.nl/rio/id/Onderwijsbestuur/100B490",
    }

  }

  render() {
    return (
      <div id="buttons">
        <p>{this.props.datasource.currentDatasource.endpoint}</p>
        <button onClick={() => this.props.fetchTest()}>Fetch Test</button>
      </div>
    )
  }
}

export default Example