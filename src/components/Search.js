import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super();

  }
  render() {

    return (
      <div>
        <p>{this.props.datasource.currentDatasource.endpoint}</p>
        <p>dit dus</p>
        <button onClick={() => this.props.fetchTest()}>Fetch Test</button>
        <button onClick={() => this.props.fetchSPARQL(this.props.datasource.currentDatasource.endpoint)}>Fetch SPARQL</button>
        <button onClick={() => this.props.sparql(this.props.datasource.currentDatasource.endpoint, "select * {?s ?p ?o.}")}>Fetch query</button>

      </div>

    )

  }
}

export default Search

