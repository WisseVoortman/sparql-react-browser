import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super();
    this.query = "SELECT * WHERE" + "{" + "?sub ?pred ?obj ." + "}" + "LIMIT 10";
  }
  render() {

    return (
      <div>
        <p>{this.props.datasource.currentDatasource.endpoint}</p>
        <button onClick={() => this.props.fetchTest()}>Fetch Test</button>
        <button onClick={() => this.props.fetchAxiosGet()}>Fetch axios Get</button>
        <button onClick={() => this.props.fetchAxiosPost(this.query, this.props.datasource.currentDatasource)}>Fetch axios Post</button>
        <button onClick={() => this.props.fetchSPARQL()}>Fetch SPARQL</button>
        <button onClick={() => this.props.sparql()}>Fetch query</button>
        <button onClick={() => this.props.push('/graph')}>Ga naar graph</button>
      </div>

    )

  }
}

export default Search

