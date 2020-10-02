import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super();
  }
  render() {

    return (
      <div>
        <p>{this.props.datasource.currentDatasource.endpoint}</p>
        <button onClick={() => this.props.fetchTest()}>Fetch Test</button>
        <button onClick={() => this.props.fetchAxios()}>Fetch axios</button>
        <button onClick={() => this.props.fetchSPARQL()}>Fetch SPARQL</button>
        <button onClick={() => this.props.sparql()}>Fetch query</button>
        <button onClick={() => this.props.push('/graph')}>Ga naar graph</button>
      </div>

    )

  }
}

export default Search

