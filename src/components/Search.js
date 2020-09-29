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
        <button onClick={() => this.props.fetchSPARQL()}>Fetch SPARQL</button>
        <button onClick={() => this.props.sparql()}>Fetch query</button>
        <button onClick={() => fetch('http://localhost:8080/rdf4j-workbench/repositories/1/query?action=&queryLn=SPARQL&query=SELECT%20*%20%0AWHERE%20%0A%7B%0A%20%20%3Fs%20%3Fp%20%3Fo%20.%20%0A%20%20FILTER%20(regex(%3Fo%2C%20%229202LE%22))%0A%7D&limit_query=100&infer=true&')}>Fetch qqq</button>


      </div>

    )

  }
}

export default Search

