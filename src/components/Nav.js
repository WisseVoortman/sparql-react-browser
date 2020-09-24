import React from 'react'
import {
  NavLink,
} from 'react-router-dom'

import { Container, Navbar, NavbarBrand, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'

//import Logo from '../assets/img/logo.svg'

class Navigation extends React.Component {
  render() {
    return (
      <div className="Navigation">
        <Navbar expand="lg" fixed="top">
          <Navbar.Brand as={NavLink} activeClassName="notactive" to="/">
            <img
              // src={Logo}
              width="100"
              height="100"
              alt="Logo"
            /><b>React SPARQL Browser</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav.Link as={NavLink} exact activeClassName="active" to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} activeClassName="active" to="/contact">Contact</Nav.Link>
            <Nav.Link as={NavLink} activeClassName="active" to="/graph">Graph</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Navigation