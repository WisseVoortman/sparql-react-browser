import React from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'



//pages
import Home from '../pages/Home'
import Graph from '../pages/Graph'
import Contact from '../pages/Contact'
import Notfound from '../pages/NotFound'

class PageContent extends React.Component {
  render() {
    return (
      <div className="PageContent">
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sparql-react-browser/home" component={Home} />
            <Route exact path="/sparql-react-browser/" component={Home} />
            <Route exact path="/sparql-react-browser/graph" component={Graph} />
            <Route exact path="/sparql-react-browser/contact" component={Contact} />

            <Route component={Notfound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default PageContent