import React from 'react'
import { Button, Card, CardDeck } from 'react-bootstrap'

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
      <>
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title>Persoon & relevante adressen</Card.Title>
              <Card.Text>
                Dit voorbeeld laat zien hoe de applicatie een persoon visualiseerd met de bijbehorende relevante adressen</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => this.props.fetchTest()}>Bekijk voorbeeld</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Extra gevens opvragen </Card.Title>
              <Card.Text>
                Een blauwe node representeerd een uri, door hierop te klikken kan extra informatie over deze uri worden opgevraagd en toegeveogd aan de visualisatie.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => this.props.fetchAboutSubject('SELECT * ' +
                'WHERE { <http://lod.onderwijsregistratie.nl/rio/id/Onderwijsbestuur/100B490> ?property ?object }' +
                'limit 200', this.props.datasource.currentDatasource)}>Bekijk voorbeeld</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>zoeken op basis van text input</Card.Title>
              <Card.Text>
                Dit voorbeeld laat zien hoe je in de applicatie kunt zoeken naar bepaalde klasses.</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => this.props.fetchTest()}>Bekijk voorbeeld</Button>
            </Card.Footer>
          </Card>

        </CardDeck>
      </>
    )
  }
}

export default Example