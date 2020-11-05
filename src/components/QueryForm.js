import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Gui from './Yasgui'

class QueryForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      query: "SELECT * WHERE" + "{" + "?sub ?pred ?obj ." + "}" + "LIMIT 10",
      subject: "http://lod.onderwijsregistratie.nl/rio/id/Onderwijsbestuur/100B490",
    }

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);

    this.handleSubjectChange = this.handleSubjectChange.bind(this)
    this.handleSubjectDetailsQuerySubmit = this.handleSubjectDetailsQuerySubmit.bind(this)

  }

  handleQueryChange(event) {
    console.log(event.target.value)
    this.setState({ query: event.target.value });
  }

  handleQuerySubmit(event) {
    this.props.fetchSparql(this.state.query, this.props.datasource.currentDatasource)
    event.preventDefault();
  }

  handleSubjectChange(event) {
    console.log(event.target.value)
    this.setState({ subject: event.target.value });
  }

  handleSubjectDetailsQuerySubmit(event) {
    var uri = this.state.subject
    const query = 'SELECT * ' +
      'WHERE { <' + uri + '> ?property ?object }' +
      'limit 200';
    this.props.fetchAboutSubject(query, uri, this.props.datasource.currentDatasource)

    event.preventDefault();
  }

  render() {
    return (
      <div>

        <div id="queryform">
          <Form onSubmit={this.handleQuerySubmit}>

            <Form.Group controlId="QueryInput">
              <Form.Label>Query input:</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Input query" value={this.state.query} onChange={this.handleQueryChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>

        <div id="querysubjectdetails form">
          <Form onSubmit={this.handleSubjectDetailsQuerySubmit}>

            <Form.Group controlId="SubjectInput">
              <Form.Label>Query input:</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Input subject" value={this.state.subject} onChange={this.handleSubjectChange} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </div>
        <Gui></Gui>
      </div >
    )
  }
}

export default QueryForm

