import React from 'react'
import ConnectedSearch from '../containers/ConnectedSearch'

class Home extends React.Component {

  render() {
    return (
      <div className="Home">
        <h2>home</h2>
        <ConnectedSearch />
      </div>

    )
  }
}
export default Home