import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
  NavLink,
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
            <Route path="/home" component={Home} />
            <Route path="/graph" component={Graph} />
            <Route path="/contact" component={Contact} />

            <Route component={Notfound} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default PageContent