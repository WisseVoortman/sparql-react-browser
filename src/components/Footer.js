import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

class Footer extends React.Component {
  render() {
    return (
      <footer className="Footer">
        <Container>
          <Row>
            <Col sm={4}></Col>
            <Col sm={4}><p>© React-SPARQL-Browser {new Date().getYear() + 1900}</p></Col>
            <Col sm={4}></Col>

          </Row>
        </Container>
      </footer>
    )
  }
}

export default Footer