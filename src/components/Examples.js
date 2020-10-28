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
              <Card.Title>Voorbeeld 2</Card.Title>
              <Card.Text>
                Indien mogelijk iets dat demonstreert dat dat vanaf meerdere bronnen afkomstig kan zijn</Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button onClick={() => this.props.fetchTest()}>Bekijk voorbeeld</Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Voorbeeld 3</Card.Title>
              <Card.Text>
                Dit voorbeeld laat zien hoe de applicatie een persoon visualiseerd met de bijbehorende relevante adressen</Card.Text>
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