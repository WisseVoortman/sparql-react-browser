import React from 'react'

import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

import ConnectedSearch from '../containers/ConnectedSearch'

class Home extends React.Component {

  render() {
    return (
      <div className="Home">
        <h2>home</h2>
        <Jumbotron>
          <h1>Sparql-React-Browser</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
  </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
      </div>

    )
  }
}
export default Home