import React from 'react'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

import ConnectedSearch from '../containers/ConnectedSearch'

class Home extends React.Component {

  render() {
    return (
      <div className="Home">
        <Jumbotron>
          <h1>Sparql-React-Browser</h1>
          <p>
            Welkom bij de Sparql-React-Browser. Via deze applicatie kunt u open onderwijsdata opvragen en visualiseren. Met onderstaande zoekmogelijkheid komt u snel bij de data die u zoekt. Data wordt weergegeven in een graph JSON. Het gaat om open informatie.
          </p>
          <p>
            <Button variant="primary" onClick={() => this.props.history.push('/graph')}>Probeer uit!</Button>
          </p>
        </Jumbotron>
      </div>

    )
  }
}
export default Home