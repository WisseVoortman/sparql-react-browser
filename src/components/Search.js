import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class Search extends React.Component {
  constructor(props) {
    super();
    this.state = {
      query: "SELECT * WHERE" + "{" + "?sub ?pred ?obj ." + "}" + "LIMIT 10",
    }
    this.query = "SELECT * WHERE" + "{" + "?sub ?pred ?obj ." + "}" + "LIMIT 10";

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    this.props.fetchAxiosPost(this.state.query, this.props.datasource.currentDatasource)
    event.preventDefault();
  }

  render() {

    return (
      <div>

        <div id="queryform">
          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="QueryInput">
              <Form.Label>Query input:</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Input query" value={this.state.query} onChange={this.handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>

        <div id="buttons">
          <p>{this.props.datasource.currentDatasource.endpoint}</p>
          <button onClick={() => this.props.fetchTest()}>Fetch Test</button>
          <button onClick={() => this.props.fetchAxiosGet()}>Fetch axios Get</button>
          <button onClick={() => this.props.fetchAxiosPost(this.state.query, this.props.datasource.currentDatasource)}>Fetch axios Post</button>
          <button onClick={() => this.props.fetchSPARQL()}>Fetch SPARQL</button>
          <button onClick={() => this.props.sparql()}>Fetch query</button>
          <button onClick={() => this.props.push('/graph')}>Ga naar graph</button>
        </div>
      </div >

    )

  }
}

export default Search

